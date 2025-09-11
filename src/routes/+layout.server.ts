import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const session = await locals.auth()
    return { session };
}) satisfies LayoutServerLoad;