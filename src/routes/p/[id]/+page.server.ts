// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { users, habitsTable, daysTable } from "$lib/server/db/schema";
import { and, count, eq, gte, lt } from "drizzle-orm";
import type { Actions } from "../$types";

export const load = (async ({ params }) => {
	const user = await db.query.users.findFirst({
		where: eq(users.id, params.id),
		with: {
			habimons: true,
		},
	});

	const user_id = params.id;

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
