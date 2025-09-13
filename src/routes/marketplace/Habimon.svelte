<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	let { habimon, user } = $props();
	import * as Drawer from "$lib/components/ui/drawer/index.js";

	const rarityColors: Record<
		string,
		{ bg: string; text: string; ring: string; shadow: string }
	> = {
		Common: {
			bg: "bg-gray-200",
			text: "text-gray-800",
			ring: "ring-gray-400",
			shadow: "drop-shadow-[0_0_8px_rgba(156,163,175,0.7)]", // gray glow
		},
		Uncommon: {
			bg: "bg-green-200",
			text: "text-green-800",
			ring: "ring-green-400",
			shadow: "drop-shadow-[0_0_8px_rgba(74,222,128,0.7)]", // green glow
		},
		Rare: {
			bg: "bg-blue-200",
			text: "text-blue-800",
			ring: "ring-blue-400",
			shadow: "drop-shadow-[0_0_8px_rgba(96,165,250,0.7)]", // blue glow
		},
		Epic: {
			bg: "bg-purple-300",
			text: "text-purple-900",
			ring: "ring-purple-400",
			shadow: "drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]", // purple glow
		},
		Legendary: {
			bg: "bg-amber-300",
			text: "text-amber-900",
			ring: "ring-amber-400",
			shadow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]", // gold glow
		},
	};
</script>

<div
	class={`flex flex-col sm:w-48 w-full items-center justify-between rounded-2xl border p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg duration-250 ${rarityColors[habimon.rarity].bg} ${rarityColors[habimon.rarity].text}`}
>
	<!-- Emoji -->
	<h1 class="text-7xl">{habimon.image}</h1>

	<!-- Name + rarity -->
	<div class="mt-3 text-center space-y-1">
		<p class="font-semibold text-lg text-[var(--foreground)]">{habimon.name}</p>
		<span
			class="inline-block rounded-full px-3 py-0.5 text-xs font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)]"
		>
			{habimon.rarity}
		</span>
	</div>

	<!-- Price -->
	<p class="mt-2 font-medium text-[var(--foreground)]">💎 {habimon.price}</p>

	<!-- Action -->
	<div class="mt-3 w-full">
		{#if user?.habimons?.some((h: any) => h.name === habimon.name)}
			<button
				class="w-full rounded-md bg-[var(--muted)] px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] opacity-60 cursor-not-allowed"
				disabled
			>
				Already Owned
			</button>
		{:else}
			<!-- drawer here -->
			<div class="z-1000">
				<Drawer.Root>
					<Drawer.Trigger class="w-full">
						<Button class="w-full">Buy Now</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title class="sr-only">{habimon.name}</Drawer.Title>
							<Drawer.Description class="sr-only">
								Purchase details for {habimon.name}
							</Drawer.Description>
						</Drawer.Header>

						<!-- Content Layout -->
						<div class="flex md:flex-row flex-col justify-center gap-6 p-4">
							<!-- Big Emoji -->
							<div
								class={`shrink-0 flex justify-center items-center rounded-full ring-2 
          ${rarityColors[habimon.rarity].ring} ${rarityColors[habimon.rarity].shadow}
          text-6xl sm:text-7xl p-5 
          w-20 h-20 sm:w-32 sm:h-32`}
							>
								{habimon.image}
							</div>

							<!-- Info Section -->
							<div class="flex flex-col space-y-3 md:w-md w-full">
								<p class="font-semibold text-2xl text-[var(--foreground)]">
									{habimon.name}
								</p>
								<p class="text-lg font-medium text-[var(--foreground)]">
									💎 {habimon.price}
								</p>
								<p class="text-sm text-muted-foreground max-w-md">
									{habimon.bio}
								</p>
								<!-- Buy Form -->
								<form
									action="?/buyHabimon"
									method="POST"
									class="mt-4 space-y-2"
								>
									<input type="hidden" name="name" value={habimon.name} />

									<!-- Buy Now -->
									<button
										type="submit"
										class={`w-full rounded-md px-4 py-2 text-sm font-medium transition hover:brightness-110 ${rarityColors[habimon.rarity].bg} ${rarityColors[habimon.rarity].text}`}
									>
										Buy Now
									</button>

									<!-- Cancel -->
									<Drawer.Close class="w-full">
										<Button
											role="button"
											type="button"
											class="w-full"
											variant="secondary"
										>
											Cancel
										</Button>
									</Drawer.Close>
								</form>
							</div>
						</div>
						<div id="space-at-end" class="py-10"></div>
					</Drawer.Content>
				</Drawer.Root>
			</div>
			<!-- drawer end -->
		{/if}
	</div>
</div>
