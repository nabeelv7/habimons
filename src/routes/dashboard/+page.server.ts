// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { daysTable, habitsTable, users } from "$lib/server/db/schema";
import { and, eq, gte, lt } from "drizzle-orm";
import getHabitDaysThisWeek from "$lib/defs/days-this-week";

const TODAY_START_UTC = Math.floor(Date.now() / 86_400_000) * 86_400_000;
const TODAY_END_UTC = TODAY_START_UTC + 86_400_000;

const now = new Date();
// Start of week (Monday)
const startOfWeek = new Date(now);
startOfWeek.setHours(0, 0, 0, 0);
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

// End of week (Sunday)
const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);
endOfWeek.setHours(23, 59, 59, 999);

export const load = (async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	const [{ id: user_id }] = await db
		.select()
		.from(users)
		.where(eq(users.email, session.user.email));

	const habits = await db.query.habitsTable.findMany({
		where: eq(habitsTable.user_id, user_id),
		with: {
			days: {
				where: and(
					gte(daysTable.date, startOfWeek.getTime()),
					lt(daysTable.date, endOfWeek.getTime())
				),
			},
		},
	});

	return {
		habits,
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createHabit: async ({ request, locals }) => {
		const session = await locals.auth();
		if (!session || !session?.user) redirect(307, "/signin");

		const data = await request.formData();
		const [{ id: user_id }] = await db
			.select()
			.from(users)
			.where(eq(users.email, session.user.email));

		await db.insert(habitsTable).values({
			name: data.get("name"),
			days_of_week: data.get("days_of_week"),
			user_id,
		});
	},
	createDay: async ({ request, locals }) => {
		const session = await locals.auth();
		if (!session || !session?.user) redirect(307, "/signin");

		const data = await request.formData();
		const done = data.get("done") === "on";
		const habitId = Number(data.get("habit_id"));

		// Get user id
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, session.user.email));
		const user_id = user.id;
		let user_gems = user.gems;

		// Verify habit belongs to this user
		const habit = await db
			.select()
			.from(habitsTable)
			.where(and(eq(habitsTable.id, habitId), eq(habitsTable.user_id, user_id)))
			.limit(1);

		if (!habit.length) {
			throw new Error("unauthorized habit access");
		}

		const [habitData] = habit;

		if (done) {
			// Count how many days are already completed this week
			const daysThisWeek = await getHabitDaysThisWeek(habitId);

			if (daysThisWeek.length >= habitData.days_this_week) {
				console.log("Weekly limit reached, not inserting new day.");
				return;
			}

			// Insert today’s day
			await db.insert(daysTable).values({
				date: Date.now(),
				habit_id: habitId,
			});

			// increase user gems
			if (daysThisWeek.length > 0) {
				user_gems = user_gems + 3 * daysThisWeek;
			} else {
				user_gems = user_gems + 2;
			}
			await db.update(users).set({ gems: user_gems }).where(users.id, user_id);
		} else {
			// delete today’s day entry
			await db
				.delete(daysTable)
				.where(
					and(
						eq(daysTable.habit_id, habitId),
						gte(daysTable.date, TODAY_START_UTC),
						lt(daysTable.date, TODAY_END_UTC)
					)
				);
		}
	},
};
