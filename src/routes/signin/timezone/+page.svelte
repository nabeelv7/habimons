<script lang="ts">
	import TimeZoneSelect from "$lib/components/TimeZoneSelect.svelte";
	import timezones from "$lib/timezones";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

	function getTimeForTimeZone(timezone: string) {
		return new Date().toLocaleTimeString("en-US", {
			timeZone: timezone,
			hour: "2-digit",
			minute: "2-digit",
		});
	}
</script>

<div class="flex flex-col justify-center items-center min-h-screen">
	<h1>Select your Timezone</h1>
	<form class="w-sm" action="?/updateTimezone" method="POST">
		<select name="timezone" id="timezone" value={tz}>
			{#each timezones as timezone}
				<option value={timezone}
					>{timezone}, where time is {getTimeForTimeZone(timezone)}</option
				>
			{/each}
		</select>

		<button type="submit">Submit</button>
	</form>
</div>
