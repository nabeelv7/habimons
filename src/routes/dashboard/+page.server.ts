// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { daysTable, habitsTable, users } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";

export const load = (async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	const [{ id }] = await db
		.select()
		.from(users)
		.where(eq(users.email, session.user.email));

	const habits = await db
		.select()
		.from(habitsTable)
		.where(eq(habitsTable.user_id, id));

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

		const [{ id: user_id }] = await db
			.select()
			.from(users)
			.where(eq(users.email, session.user.email));

		const habit = await db
			.select()
			.from(habitsTable)
			.where(
				and(
					eq(habitsTable.id, data.get("habit_id")),
					eq(habitsTable.user_id, user_id)
				)
			)
			.limit(1);

		if (!habit.length) {
			throw new Error("unauthorized habit access");
		}

		await db.insert(daysTable).values({
			date: Date.now(),
			habit_id: data.get("habit_id"),
		});
	},
};
