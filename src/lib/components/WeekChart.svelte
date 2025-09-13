<script lang="ts">
	import { onMount } from "svelte";
	import { Chart, registerables } from "chart.js";

	Chart.register(...registerables);

	export let chart_days: { date: string; completed: boolean }[] = [];

	let chartCanvas: HTMLCanvasElement;
	let chartInstance: Chart;

	onMount(() => {
		if (!chart_days || chart_days.length === 0) return;

		const labels = chart_days.map((d) =>
			new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
		);

		const data = chart_days.map((d) => (d.completed ? 1 : 0));

		chartInstance = new Chart(chartCanvas, {
			type: "bar",
			data: {
				labels,
				datasets: [
					{
						label: "Completed",
						data,
						backgroundColor: data.map((v) => (v ? "#22c55e" : "#d1d5db")),
						borderRadius: 6,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: { display: false },
					tooltip: {
						enabled: true, // hide tooltip if not needed
					},
					// @ts-ignore
					datalabels: {
						display: true,
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						max: 1,
						display: false,
					},
					x: {
						grid: {
							display: true, // remove vertical grid lines
						},
						ticks: {
							color: "foreground", // green, or any Tailwind color hex
							font: {
								size: 17, // change font size
								family: "DM Sans Variable",
								weight: "bold", // optional
							},
						},
					},
				},
				animation: {
					onComplete: function () {
						// 'this' is the chart instance
						const chart = this;
						const ctx = chart.ctx;

						chart.data.datasets.forEach((dataset, datasetIndex) => {
							chart.getDatasetMeta(datasetIndex).data.forEach((bar, index) => {
								if (dataset.data[index] === 1) {
									ctx.fillStyle = "#000";
									ctx.font = "bold 10px sans-serif";
									ctx.textAlign = "center";
									ctx.fillText("Done", bar.x, bar.y - 6);
								}
							});
						});
					},
				},
			},
		});

		return () => chartInstance.destroy();
	});
</script>

<div class="md:w-md w-full">
	<canvas
		bind:this={chartCanvas}
		class="w-full h-auto border p-3 border-neutral"
	></canvas>
</div>
