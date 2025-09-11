import { db } from "$lib/server/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitHub],
})