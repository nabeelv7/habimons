import { redirect } from '@sveltejs/kit';
import { signIn } from "../../auth"
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    const session: any = await locals.auth();
    if (session || session?.user) redirect(307, "/");

    return {};
}) satisfies PageServerLoad;


export const actions: Actions = { default: signIn }
