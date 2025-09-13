<script lang="ts">
	import timezones from "$lib/timezones";
	import Button from "./ui/button/button.svelte";

	let { user_timezone } = $props();
	function getTimeForTimeZone(timezone: string) {
		return new Date().toLocaleTimeString("en-US", {
			timeZone: timezone,
			hour: "2-digit",
			minute: "2-digit",
		});
	}
</script>

<form
	action="?/updateTimezone"
	method="POST"
	class="flex md:flex-row flex-col px-5 items-center gap-2 justify-center"
>
	<select
		class="border rounded-md px-3 py-3 text-xl border-border md:w-md w-full"
		name="timezone"
		id="timezone"
	>
		{#each timezones as timezone}
			<option value={timezone} selected={timezone === user_timezone}>
				{timezone}, where time is {getTimeForTimeZone(timezone)}
			</option>
		{/each}
	</select>
	<Button class="px-5 max-md:w-full py-6 text-xl" type="submit">Submit</Button>
</form>
