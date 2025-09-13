<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import Habimon from "./Habimon.svelte";

	let { data } = $props();
	const user = data.user;
	console.log(user);
</script>

<main class="w-full p-10">
	<nav
		class="flex md:flex-row flex-col gap-5 justify-between items-center w-full"
	>
		<h1 class="text-4xl font-bold">Your Habimons</h1>

		<div id="nav-end" class="flex justify-center items-center gap-5">
			<h1 class="text-xl font-medium">💎 {user?.gems}</h1>

			<Button variant="outline" href="/marketplace">Buy Habimons &rarr;</Button>
		</div>
	</nav>

	<section class="flex flex-wrap gap-4 py-10">
		{#if user.habimons.length > 0}
			{#each user.habimons as habimon}
				<Habimon {habimon} />
			{/each}
		{:else}
			<div class="py-10 flex flex-col gap-4 w-full justify-center items-center">
				<p class="text-red-500 text-xl">No Habimons Found 😿</p>
				<Button variant="outline" href="/marketplace"
					>Buy Habimons &rarr;</Button
				>
			</div>
		{/if}
	</section>
</main>
