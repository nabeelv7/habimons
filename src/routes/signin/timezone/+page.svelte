<script lang="ts">
	import TimeZoneSelect from "$lib/components/TimeZoneSelect.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<div class="flex flex-col justify-center items-center min-h-screen gap-3">
	<h1 class="text-3xl font-bold">Select your Timezone</h1>
	<TimeZoneSelect user_timezone={tz} />
</div>
