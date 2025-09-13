<script lang="ts">
	import { onMount } from "svelte";
	import { Chart, registerables } from "chart.js";

	Chart.register(...registerables);

	export let habits: { id: number; name: string; completedDays: number }[] = [];

	let chartCanvas: HTMLCanvasElement;
	let chartInstance: Chart;

	const pastelColors = [
		"#a8dadc",
		"#ffb4a2",
		"#ffe066",
		"#6a4c93",
		"#ff7b00",
		"#8ecae6",
		"#219ebc",
		"#ffadad",
		"#ffd6a5",
		"#caffbf",
		"#bdb2ff",
		"#ffc6ff",
		"#ffafcc",
		"#fdffb6",
		"#9bf6ff",
		"#ffcad4",
		"#d0f4de",
		"#f9c74f",
		"#f94144",
		"#90be6d",
	];

	onMount(() => {
		if (!habits || habits.length === 0) return;

		const labels = habits.map((h) => h.name);
		const data = habits.map((h) => h.completedDays);

		chartInstance = new Chart(chartCanvas, {
			type: "pie",
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: pastelColors.slice(0, habits.length),
						borderColor: "#fff",
						borderWidth: 2,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "bottom",
						labels: {
							font: {
								family: "DM Sans Variable",
								size: 17,
								weight: "bold",
							},
							color: "#333", // optional, changes legend text color
						},
					},
					tooltip: {
						bodyFont: {
							family: "DM Sans Variable",
							size: 12,
						},
						callbacks: {
							label: (ctx) =>
								` ${ctx.label}: ${ctx.formattedValue} day${
									// @ts-ignore
									ctx.raw > 1 ? "s" : ""
								}`,
						},
					},
				},
			},
		});

		return () => chartInstance.destroy();
	});
</script>

<div class="w-full max-w-md mx-auto p-4 rounded-lg">
	<canvas bind:this={chartCanvas} class="w-full h-80"></canvas>
</div>
