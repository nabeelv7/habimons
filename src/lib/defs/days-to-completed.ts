// @ts-nocheck
export function getLast7DaysWithStatus(days, offsetDays = 0) {
	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (6 - i + offsetDays));
		return d;
	});

	return last7Days.map((d) => {
		const dateStr = d.toDateString();
		const completed = days.some(
			(day) => new Date(day.date).toDateString() === dateStr
		);
		return { date: dateStr, completed };
	});
}
