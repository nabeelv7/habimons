<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex">
	<Sidebar />
	<div class="flex flex-col">
		<ScrollArea class="w-full">
			{@render children()}
		</ScrollArea>
		<div class="md:hidden flex py-15"></div>
	</div>
</div>
