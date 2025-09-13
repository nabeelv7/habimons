<script lang="ts">
	// @ts-nocheck
	import { signOut } from "@auth/sveltekit/client";
	import PieChart from "$lib/components/PieChart.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import { page } from "$app/state";
	import toast from "svelte-french-toast";

	let { data } = $props();
	const user = data.user;
	const habits = data.habits;

	// 5x5 grid for habimons
	const totalSlots = 25;
	const habimonsWithEmpty = [
		...user.habimons,
		...Array(totalSlots - user.habimons.length).fill(null),
	];

	const profileLink = `${page.url.protocol + "//" + page.url.host + "/p/" + user.id}`;

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(profileLink);
			toast.success("Copied to clipboard");
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger asChild>
		<Button
			class="flex bg-blue-600 justify-center items-center fixed md:top-10 md:right-10 top-5 right-5"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-share-icon lucide-share"
			>
				<path d="M12 2v13" />
				<path d="m16 6-4-4-4 4" />
				<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
			</svg>
			<span class="max-md:hidden">Share</span>
		</Button>
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Profile Share Link</Dialog.Title>
			<Dialog.Description>
				Copy the link and share it to give others access to your profile.
			</Dialog.Description>
		</Dialog.Header>

		<div class="flex gap-2 mt-4">
			<Input readonly value={profileLink} class="flex-1" />
			<Button onclick={copyLink} class="px-4 py-2">Copy</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>

<main class="min-h-screen flex justify-center p-6 md:p-10">
	<div class="w-full max-w-6xl grid gap-8 rounded-md">
		<!-- Unified User Info + PieChart + Habimons Grid Card -->
		<div class="p-6 md:p-10 flex flex-col gap-8">
			<!-- User Info + Logout + PieChart -->
			<div
				class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
			>
				<!-- User Info -->
				<div
					class="flex flex-col md:flex-row items-center md:items-start gap-4 flex-1"
				>
					<img
						src={user.image}
						alt="Avatar"
						class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md"
					/>
					<div class="flex flex-col gap-1 text-center md:text-left">
						<h1 class="text-3xl md:text-4xl font-bold">{user.name}</h1>
						<p class="opacity-80">{user.email}</p>
						<Button class="mt-2" onclick={() => signOut()} variant="destructive"
							>Logout</Button
						>
					</div>
				</div>

				<!-- Pie Chart -->
				<div class="w-full md:w-1/3 mt-6 md:mt-0">
					<PieChart {habits} />
				</div>
			</div>

			<!-- Habimons Grid -->
			<div class="rounded-2xl p-4 md:p-6">
				<h2
					class="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left"
				>
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
		</div>
	</div>
</main>
