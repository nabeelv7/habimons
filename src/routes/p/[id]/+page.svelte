<script lang="ts">
	// @ts-nocheck
	import PieChart from "$lib/components/PieChart.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import { page } from "$app/state";
	import toast from "svelte-french-toast";
	import Navbar from "../../marketplace/Navbar.svelte";

	let { data } = $props();
	const user = data.user;
	const habits = data.habits;

	// 5x5 grid for habimons
	const totalSlots = 25;
	const habimonsWithEmpty = [
		...user.habimons,
		...Array(totalSlots - user.habimons.length).fill(null),
	];
</script>

<Navbar />
<main class="min-h-screen flex justify-center p-6 md:p-10 mt-26">
	<div class="w-full max-w-screen-sm flex flex-col gap-10">
		<!-- User Info -->
		<div class="flex flex-col items-center gap-4">
			<img
				src={user.image}
				alt="Avatar"
				class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md"
			/>
			<h1 class="text-3xl md:text-4xl font-bold">{user.name}</h1>
			<p class="text-xl font-semibold opacity-80">
				{user.name} has 💎 {user.gems} gems
			</p>
		</div>

		<!-- Habimons Grid -->
		<div class="rounded-2xl p-4 md:p-6">
			<h2 class="text-2xl md:text-3xl font-bold mb-6 text-center">
				{user.name}'s Habimons
			</h2>
			<div class="grid grid-cols-5 gap-4">
				{#each habimonsWithEmpty as habimon}
					{#if habimon}
						<div
							class="aspect-square flex items-center justify-center rounded-xl shadow-md transition md:text-6xl text-3xl"
						>
							{habimon.image}
						</div>
					{:else}
						<div
							class="aspect-square flex items-center justify-center rounded-xl border border-dashed text-2xl"
						>
							?
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Pie Chart -->
		<div class="flexjustify-center">
			<div class="w-full">
				<PieChart {habits} />
			</div>
		</div>
	</div>
</main>

<footer
	class="fixed bottom-0 right-0 w-full backdrop-blur-2xl py-4 text-center border-t border-t-secondary px-5"
>
	This is {user.name}'s HabitsZoo profile. Create your own
	<a class="text-blue-500 underline" href="/">🐫 HabitsZoo</a> account and start
	your journey!
</footer>
