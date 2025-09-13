<script lang="ts">
	import timezones from "$lib/timezones";

	let { user_timezone } = $props();
</script>

<form action="?/updateTimezone" method="POST">
	<select
		onchange={(e) => {
			const select = e.target as HTMLSelectElement;
			select?.form?.requestSubmit();
		}}
		name="timezone"
		id="timezone"
		value={user_timezone}
	>
		{#each timezones as timezone}
			<option value={timezone}>{timezone}</option>
		{/each}
	</select>
</form>
