import { db } from "$lib/server/db";
import { daysTable } from "$lib/server/db/schema";
import { gte, lte, and, eq } from "drizzle-orm";

async function getHabitDaysThisWeek(habitId: number) {
	const now = new Date();

	// Start of week (Monday)
	const startOfWeek = new Date(now);
	startOfWeek.setHours(0, 0, 0, 0);
	startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

	// End of week (Sunday)
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	const daysThisWeek = await db
		.select()
		.from(daysTable)
		.where(
			and(
				eq(daysTable.habit_id, habitId),
				gte(daysTable.date, startOfWeek.getTime()),
				lte(daysTable.date, endOfWeek.getTime())
			)
		);

	return daysThisWeek;
}

export default getHabitDaysThisWeek;
