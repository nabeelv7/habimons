<script>
	// @ts-nocheck
	import WeekChart from "$lib/components/WeekChart.svelte";
	import { getLast7DaysWithStatus } from "$lib/defs/days-to-completed.js";

	let { data } = $props();
	const habit = data.habit;
	const chart_days = getLast7DaysWithStatus(habit.days);

	// last week (offset by 7 days)
	const lastWeekDays = getLast7DaysWithStatus(
		habit.days,
		7, // optional parameter to offset by 7 days
	);

	const completedCount = chart_days.filter((day) => day.completed).length;

	const lastWeekCompletedCount = lastWeekDays.filter(
		(day) => day.completed,
	).length;

	const calculateConsistency = (completed, total) => {
		return Math.floor((completed / total) * 100);
	};
</script>

<main class="w-full md:p-10 p-8">
	<nav class="flex flex-col gap-2">
		<h1 class="text-4xl font-bold">{habit.name}</h1>
		<p class="text-xl opacity-80">{habit.days_of_week} days a week</p>
	</nav>

	<section
		class="flex lg:flex-row flex-col items-center xl:gap-50 flex-wrap md:gap-20 gap-10"
		id="chart-grid"
	>
		<div class="flex flex-col">
			<h1 class="md:text-3xl text-2xl font-medium mt-10 mb-1">This Week</h1>
			<p class="text-xl mb-4 opacity-85">
				Consistency Rate: {calculateConsistency(
					completedCount,
					chart_days.length,
				)}%
			</p>
			<div class="md:w-md w-full">
				<WeekChart {chart_days} />
			</div>
		</div>

		<div class="flex flex-col">
			<h1 class="md:text-3xl text-2xl font-medium mt-10 mb-3">Last Week</h1>
			<p class="text-xl mb-4 opacity-85">
				Consistency Rate: {calculateConsistency(
					lastWeekCompletedCount,
					lastWeekDays.length,
				)}%
			</p>
			<div class="md:w-md w-full">
				<WeekChart chart_days={lastWeekDays} />
			</div>
		</div>
	</section>
</main>
