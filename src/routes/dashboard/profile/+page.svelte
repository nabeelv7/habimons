<script>
	// @ts-nocheck
	import { signOut } from "@auth/sveltekit/client";
	import TimeZoneSelect from "$lib/components/TimeZoneSelect.svelte";

	let { data } = $props();
	const user = data.user;
	const habits = data.habits;
	console.log({ user, habits });

	const rarityColors = {
		Common: "bg-gray-300",
		Uncommon: "bg-slate-100",
		Rare: "bg-purple-200",
		Epic: "bg-teal-200",
		Legendary: "bg-amber-300",
	};
</script>

<div class="flex flex-col justify-center items-center">
	<div class="rounded-xs border border-stone-400 bg-stone-200 p-5">
		<h1>{user?.name}</h1>
		<p>{user?.email}</p>
		<TimeZoneSelect user_timezone={user?.timezone} />
		<h3>💎 {user?.gems}</h3>
		<button onclick={() => signOut()} class="bg-red-500!"> Logout </button>

		<!-- habits -->
		<div class="mt-6">
			{#each habits as habit}
				<article class="flex flex-col">
					{habit.name}
					<span>
						{habit.days_of_week} days a week
					</span>
				</article>
			{/each}
		</div>

		<!-- habimons -->
		<div class="mt-6 space-y-4">
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
	</div>
</div>
