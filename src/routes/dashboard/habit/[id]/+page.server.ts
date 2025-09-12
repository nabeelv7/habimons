// @ts-nocheck
import { db } from "$lib/server/db";
import { habitsTable, users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "../../$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ params: { id }, locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, session.user.email));

	const habit = await db.query.habitsTable.findFirst({
		where: eq(habitsTable.id, id),
		with: {
			days: true,
		},
	});

	if (habit) {
		habit.days = habit.days.map((day) => ({
			...day,
			// turn UTC (ms) into string
			date: new Date(day.date).toLocaleDateString("en-US", {
				timeZone: user.timezone,
				weekday: "short",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			}),
		}));
	}

	return {
		habit,
	};
}) satisfies PageServerLoad;
