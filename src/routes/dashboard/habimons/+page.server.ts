// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";

export const load = (async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, session.user.email));

	return {
		user,
	};
}) satisfies PageServerLoad;
