<script lang="ts">
	import habimons from "$lib/habimons";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const rarityColors: Record<string, string> = {
		Common: "bg-gray-300",
		Uncommon: "bg-slate-100",
		Rare: "bg-purple-200",
		Epic: "bg-teal-200",
		Legendary: "bg-amber-300",
	};
</script>

<div class="flex flex-col justify-center items-center py-20 text-center gap-2">
	<div>
		<h1 class="text-5xl animate-bounce">💎</h1>
		<h2>Welcome to marketplace</h2>
	</div>
	<section class="flex gap-2 flex-wrap mt-5" id="habimons-marketplace-grid">
		{#each habimons as habimon}
			<div
				class={`min-w-30 flex justify-center items-center
       flex-col rounded-md ${rarityColors[habimon.rarity]} shadow-sm p-5`}
			>
				<h1 class="text-3xl text-shadow-2xs">
					{habimon.image}
				</h1>
				<p>{habimon.name}</p>
				<p>💎 {habimon.price}</p>
				{habimon.rarity}

				<form action="?/buyHabimon" method="POST">
					<input type="hidden" name="name" value={habimon.name} />
					<button class="mt-3! w-full!" type="submit">Buy Now</button>
				</form>
			</div>
		{/each}
	</section>
</div>
