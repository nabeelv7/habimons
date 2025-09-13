<script>
	// @ts-nocheck
	let { data } = $props();
	const habit = data.habit;
</script>

<div class="flex flex-col p-10">
	<h1>{habit.name}</h1>
	<p>{habit.days_of_week} days a week</p>

	<h3>Completed days</h3>
	{#each habit.days as day}
		<p>✅ {day.date}</p>
	{/each}
</div>
