import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const session = await locals.auth();
    if (!session || !session?.user) redirect(307, "/signin");
    return {};
}) satisfies PageServerLoad;