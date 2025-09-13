<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex">
	<Sidebar />
	<div class="flex flex-col w-full">
		<div class="w-full md:pl-28 overflow-y-scroll">
			{@render children()}
		</div>
		<div class="md:hidden flex py-15"></div>
	</div>
</div>
