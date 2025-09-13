// @ts-nocheck
export function getLast7DaysWithStatus(days, offsetDays = 0) {
	const today = new Date();
	today.setDate(today.getDate() - offsetDays);

	// Determine the previous Monday
	const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday ...
	const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // if Sunday, go back 6 days
	const monday = new Date(today);
	monday.setDate(today.getDate() - diffToMonday);

	// Generate 7 days from Monday
	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const d = new Date(monday);
		d.setDate(monday.getDate() + i);
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
