import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { users } from "$lib/server/db/schema";
import { db } from "$lib/server/db";

export const load = (async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session?.user) redirect(307, "/signin");

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateTimezone: async ({ locals, request }) => {
		const session = await locals.auth();
		if (!session || !session?.user) redirect(307, "/signin");

		const data = await request.formData();

		await db.update(users).set({
			// @ts-ignore
			timezone: data.get("timezone"),
		});

		redirect(303, "/dashboard");
	},
};
