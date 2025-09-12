<script lang="ts">
	// @ts-nocheck
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	console.log("YEAHH", data.habits[0].days);
</script>

<div class="flex justify-center items-center flex-col w-full">
	<div>
		<h1>All Habits</h1>

		<div class="flex gap-2 flex-wrap">
			{#each data.habits as habit}
				<article class="space-y-1!">
					<a href={`/dashboard/habit/${habit.id}`}>view</a>

					<!-- checkbox -->
					<form action="?/createDay" method="POST">
						<input type="hidden" value={habit.id} name="habit_id" />
						<input
							onchange={(e) => {
								const input = e.target as HTMLInputElement;
								input?.form?.requestSubmit();
							}}
							checked={// ✅ true if today exists
							habit.days.some(
								(day) =>
									new Date(day.date).toDateString() ===
									new Date().toDateString(),
							) ||
								// ✅ or true if weekly quota is full
								habit.days.length >= habit.days_of_week}
							disabled={habit.days.length >= habit.days_of_week}
							name="done"
							type="checkbox"
						/>
					</form>
					<!--  -->
					<h1>{habit.name}</h1>
					<p>{habit.days_of_week} days a week</p>
				</article>
			{/each}
		</div>
	</div>

	<form action="?/createHabit" method="POST" class="mt-10">
		<h1>Create habit</h1>
		<input type="text" name="name" placeholder="habit name.." />
		<input
			type="number"
			placeholder="habit number of days.."
			name="days_of_week"
			max="7"
			min="1"
		/>
		<button type="submit">create habit</button>
	</form>
</div>
