<script>
	import Button from "$lib/components/ui/button/button.svelte";

	let { user } = $props();
</script>

<nav class="flex items-center justify-between border-b border-b-border p-5">
	<a href="/" class="flex gap-2 text-2xl font-bold"
		><span class="sm:flex hidden">🐫 </span>HabitsZoo</a
	>

	{#if user}
		<Button href="/dashboard">Dashboard &rarr;</Button>
	{:else}
		<Button href="/signin">Sign in &rarr;</Button>
	{/if}
</nav>
