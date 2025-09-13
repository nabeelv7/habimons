<script lang="ts">
	import CheckboxWrapper from "$lib/components/CheckboxWrapper.svelte";

	// @ts-nocheck
	import Button from "$lib/components/ui/button/button.svelte";
	import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<main class="w-full md:p-10 p-8">
	<nav class="flex gap-5 justify-between items-center w-full">
		<h1 class="text-4xl font-bold">Habits</h1>

		<div id="nav-end" class="flex justify-center items-center gap-5">
			<!-- create habit dialog -->
			<Dialog.Root>
				<Dialog.Trigger>
					<Button variant="outline">+ Create Habit</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Create a new Habit</Dialog.Title>
						<Dialog.Description>
							Create a new habit and complete it to earn gems 💎 and buy your
							favourite habimons 🐫.
						</Dialog.Description>
					</Dialog.Header>
					<!-- <input type="text" name="name" placeholder="habit name.." />
					<input
						type="number"
						placeholder="habit number of days.."
						name="days_of_week"
						max="7"
						min="1"
					/>
					<button type="submit">create habit</button> -->
					<!-- form start -->
					<form action="?/createHabit" method="POST">
						<Label class="mb-1 mt-1" for="name">Name</Label>
						<Input
							required
							type="text"
							name="name"
							placeholder="Habit name here.."
						/>

						<Label class="mt-4 mb-1" for="days_of_week">Days of the Week</Label>
						<Input
							type="number"
							placeholder="Number of days here.."
							name="days_of_week"
							required
							max="7"
							min="1"
						/>
						<Button class="mt-4 w-full" type="submit">Add Habit</Button>
					</form>
					<!-- form end -->
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</nav>

	<!-- habits here -->
	<section id="your-habits-grid" class="mt-8 flex flex-wrap gap-6">
		{#each data.habits as habit}
			<div
				class="bg-secondary md:w-fit w-full p-5 rounded-md flex flex-col gap-2 drop-shadow-blue-300 hover:drop-shadow-teal-300 drop-shadow-xs md:min-w-md hover:-translate-y-1 transition-all duration-250"
			>
				<div class="flex justify-between items-center gap-10">
					<h1 class="text-3xl text-shadow-sm">{habit.name}</h1>
					<form
						class="flex justify-center items-center"
						action="?/createDay"
						method="POST"
					>
						<input type="hidden" value={habit.id} name="habit_id" />

						<!-- checkbox start -->
						<CheckboxWrapper>
							<input
								class="peer size-8 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-green-300 checked:bg-emerald-500 checked:border-emerald-500"
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
						</CheckboxWrapper>
						<!-- checkbox end -->
					</form>
				</div>

				<div class="flex flex-col gap-3">
					<p class="text-xl opacity-80">{habit.days_of_week} days a week</p>

					<Button href={`/dashboard/habit/${habit.id}`}
						>View Progression &nearr;</Button
					>
				</div>
			</div>
		{/each}
	</section>
</main>

<!-- <div>
		<h1>All Habits</h1>

		<div class="flex gap-2 flex-wrap">
			{#each data.habits as habit}
				<article class="space-y-1!">
					<a href={`/dashboard/habit/${habit.id}`}>view</a>

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
</div> -->
