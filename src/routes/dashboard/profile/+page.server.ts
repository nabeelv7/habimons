// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { users, habitsTable, daysTable } from "$lib/server/db/schema";
import { and, count, eq, gte, lt } from "drizzle-orm";
import type { Actions } from "../$types";

// const now = new Date();
// // Start of week (Monday)
// const startOfWeek = new Date(now);
// startOfWeek.setHours(0, 0, 0, 0);
// startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

// // End of week (Sunday)
// const endOfWeek = new Date(startOfWeek);
// endOfWeek.setDate(startOfWeek.getDate() + 6);
// endOfWeek.setHours(23, 59, 59, 999);

export const load = (async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	const user = await db.query.users.findFirst({
		where: eq(users.email, session.user.email),
		with: {
			habimons: true,
		},
	});

	const user_id = user.id;

	// const habits = await db.query.habitsTable.findMany({
	// 	where: eq(habitsTable.user_id, user_id),
	// 	with: {
	// 		days: {
	// 			where: and(
	// 				gte(daysTable.date, startOfWeek.getTime()),
	// 				lt(daysTable.date, endOfWeek.getTime())
	// 			),
	// 		},
	// 	},
	// });

	const habitsWithCompletedDays = await db
		.select({
			id: habitsTable.id,
			name: habitsTable.name,
			completedDays: count(daysTable.id), // count rows in daysTable
		})
		.from(habitsTable)
		.leftJoin(daysTable, eq(daysTable.habit_id, habitsTable.id))
		.groupBy(habitsTable.id);

	return {
		user,
		habits: habitsWithCompletedDays,
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateTimezone: async ({ locals, request }) => {
		const session = await locals.auth();
		if (!session || !session?.user) redirect(307, "/signin");

		const data = await request.formData();

		await db.update(users).set({
			timezone: data.get("timezone"),
		});
	},
};
