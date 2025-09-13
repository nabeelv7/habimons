<script lang="ts">
	import habimons from "$lib/habimons";
	import type { PageProps } from "./$types";
	import Habimon from "./Habimon.svelte";
	import Navbar from "./Navbar.svelte";

	let { data }: PageProps = $props();
</script>

<!-- The navbar -->
<Navbar user={data?.user} />

<!-- content container -->
<div class="flex flex-col justify-center items-center py-20 text-center gap-2">
	<!-- marketplace heading -->
	<div class="flex flex-col">
		<h1 class="text-7xl drop-shadow-md drop-shadow-yellow-400" id="coin">🪙</h1>
		<h2 class="text-4xl font-bold mt-5">Welcome to Marketplace</h2>
		<h3 class="opacity-80 mt-2">
			You have {data?.user?.gems} 💎 in your account
		</h3>
	</div>
	<section
		class="flex justify-center items-center gap-4 flex-wrap mt-5 px-5"
		id="habimons-marketplace-grid"
	>
		{#each habimons as habimon}
			<Habimon {habimon} user={data?.user} />
		{/each}
	</section>
</div>

<style>
	#coin {
		display: inline-block;
		font-size: 5rem;
		transform-style: preserve-3d;
		animation: bounce 1s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
