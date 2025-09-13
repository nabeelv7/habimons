<script lang="ts">
	// Supports weights 100-900
	import "@fontsource-variable/dm-sans";
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { Toaster } from "svelte-french-toast";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
{@render children?.()}
