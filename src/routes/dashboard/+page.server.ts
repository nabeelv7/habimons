// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { habitsTable, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ locals }) => {
    const session = await locals.auth();
    if (!session || !session?.user) redirect(307, "/signin");

    const [{ id }] = await db.select().from(users).where(eq(users.email, session.user.email));

    const habits = await db.select().from(habitsTable).where(eq(habitsTable.user_id, id))

    console.log({ habits, id })

    return {
        habits
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    createHabit: async ({ request, locals }) => {
        const session = await locals.auth();
        if (!session || !session?.user) redirect(307, "/signin")

        const data = await request.formData();
        const [{ id }] = await db.select().from(users).where(eq(users.email, session.user.email));

        await db.insert(habitsTable).values({
            name: data.get("name"),
            days: data.get("days"),
            user_id: id,
        })
    }
};