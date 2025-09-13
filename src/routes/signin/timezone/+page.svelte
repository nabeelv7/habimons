<script lang="ts">
	import TimeZoneSelect from "$lib/components/TimeZoneSelect.svelte";
	import timezones from "$lib/timezones";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<div class="flex flex-col justify-center items-center min-h-screen">
	<h1>Select your Timezone</h1>
	<TimeZoneSelect />
</div>
