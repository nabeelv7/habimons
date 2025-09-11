import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const session: any = await locals.auth();
    if (session || session?.user) redirect(307, "/dashboard");

    return {};
}) satisfies PageServerLoad;