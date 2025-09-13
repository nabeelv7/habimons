<script lang="ts">
	let { data } = $props();
	const user = data.user;

	const rarityColors: Record<string, string> = {
		Common: "bg-gray-300",
		Uncommon: "bg-slate-100",
		Rare: "bg-purple-200",
		Epic: "bg-teal-200",
		Legendary: "bg-amber-300",
	};
</script>

<div class="absolute top-5 right-5 flex">
	<span class="mr-1.5">💎</span>
	<p class="font-medium">{user.gems}</p>
</div>

<section class="flex flex-col p-5 gap-2 flex-wrap" id="habimons-grid">
	<h1>Your Habimons</h1>
	<div class="flex flex-wrap gap-4">
		{#each user.habimons as habimon}
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
	</div>
</section>
