<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    console.log(data.habits);
</script>

<div class="flex justify-center items-center flex-col w-full">
    <div>
        <h1>All Habits</h1>

        <div class="flex gap-2 flex-wrap">
            {#each data.habits as habit}
                <article>
                    <h1>{habit.name}</h1>
                    <p>{habit.days} days a week</p>
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
            name="days"
            max="7"
            min="1"
        />
        <button type="submit">create habit</button>
    </form>
</div>
