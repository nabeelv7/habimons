import habimons from "$lib/habimons";
import { db } from "$lib/server/db";
import { marketPlaceTable } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	// seeding;

	// const habimons_load = await db
	// 	.insert(marketPlaceTable)
	// 	.values(habimons)
	// 	.returning();
	// console.log({ habimons, habimons_load });

	return {};
}) satisfies PageServerLoad;
