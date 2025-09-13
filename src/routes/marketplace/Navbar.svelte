<script>
	import Button from "$lib/components/ui/button/button.svelte";

	let { user } = $props();
</script>

<nav
	class="flex fixed top-0 left-0 w-full bg-background/30 z-99 backdrop-blur-2xl items-center justify-between border-b border-b-border p-5"
>
	<a href="/" class="flex gap-2 text-2xl font-bold"
		><span class="sm:flex hidden">🐫 </span>HabitsZoo</a
	>

	{#if user}
		<Button href="/dashboard">&larr; Dashboard</Button>
	{:else}
		<Button href="/signin">Sign in &rarr;</Button>
	{/if}
</nav>
