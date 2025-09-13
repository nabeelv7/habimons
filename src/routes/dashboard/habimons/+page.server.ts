// @ts-nocheck

import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = (async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	const user = await db.query.users.findFirst({
		where: eq(users.email, session.user.email),
		with: {
			habimons: true,
		},
	});

	return {
		user,
	};
}) satisfies PageServerLoad;
