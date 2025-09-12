<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	const user = data.user;
</script>

<div class="absolute top-5 right-5 flex">
	<span class="mr-1.5">💎</span>
	<p class="font-medium">{user.gems}</p>
</div>
<div class="p-5">
	<h1>habimons here</h1>
</div>
