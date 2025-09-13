// @ts-nocheck
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { habimonsTable, marketPlaceTable, users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import type { Actions } from "../$types";

export const load = (async ({ locals }) => {
	const session: any = await locals.auth();

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

export const actions: Actions = {
	buyHabimon: async ({ request, locals }) => {
		const session = await locals.auth();
		if (!session || !session?.user) redirect(307, "/signin");

		const data = await request.formData();

		const [habimon] = await db
			.select()
			.from(marketPlaceTable)
			.where(eq(marketPlaceTable.name, data.get("name")))
			.limit(1);

		const user = await db.query.users.findFirst({
			where: eq(users.email, session.user.email),
			with: {
				habimons: true,
			},
		});

		if (
			user &&
			user.gems >= habimon.price &&
			!user.habimons.some((h) => h.name === habimon.name)
		) {
			await db.insert(habimonsTable).values({
				name: habimon.name,
				image: habimon.image,
				price: habimon.price,
				rarity: habimon.rarity,
				bio: habimon.bio,
				user_id: user.id,
			});

			await db.update(users).set({ gems: user.gems - habimon.price });
		}
	},
};
