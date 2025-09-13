<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex">
	<Sidebar />
	<div>
		{@render children()}
	</div>
</div>
