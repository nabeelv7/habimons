<script lang="ts">
	import timezones from "$lib/timezones";
	import * as Select from "$lib/components/ui/select/index.js";

	let { user_timezone } = $props();
	function getTimeForTimeZone(timezone: string) {
		return new Date().toLocaleTimeString("en-US", {
			timeZone: timezone,
			hour: "2-digit",
			minute: "2-digit",
		});
	}
</script>

<form action="?/updateTimezone" method="POST">
	<Select.Root type="single">
		<Select.Trigger
			onchange={(e) => {
				const select = e.target as HTMLSelectElement;
				select?.form?.requestSubmit();
			}}
			name="timezone"
			id="timezone"
			value={user_timezone}
		>
			{#each timezones as timezone}
				<Select.Item value={timezone}
					>{timezone}, , where time is {getTimeForTimeZone(
						timezone,
					)}</Select.Item
				>
			{/each}
		</Select.Trigger>
	</Select.Root>
</form>
