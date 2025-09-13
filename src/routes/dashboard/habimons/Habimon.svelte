<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	let { habimon } = $props();
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
	class={`flex flex-col sm:w-52 w-full items-center rounded-2xl border p-5 shadow-md 
    transition-all hover:scale-105 hover:shadow-xl duration-300 
    ${rarityColors[habimon.rarity].bg} ${rarityColors[habimon.rarity].text}`}
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

	<!-- Action -->
	<div class="mt-3 w-full">
		<!-- drawer here -->
		<Drawer.Root>
			<Drawer.Trigger class="w-full">
				<Button class="w-full z-[1001]">View Details</Button>
			</Drawer.Trigger>
			<Drawer.Content class="z-[1002]">
				<Drawer.Header>
					<Drawer.Title class="sr-only">{habimon.name}</Drawer.Title>
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
					</div>
				</div>
				<div id="space-at-end" class="py-10"></div>
			</Drawer.Content>
		</Drawer.Root>
		<!-- drawer end -->
	</div>
</div>
