<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<main class="flex! flex-col! justify-center! items-center! min-h-screen!">
    <button
        class="bg-black!"
        onclick={() => signIn("github", { redirectTo: "/signin/timezone" })}
        >Sign in with Github</button
    >
</main>
