<script>
	const links = [
		{ href: "/dashboard", icon: "📝", label: "Habits" },
		{ href: "/dashboard/habimons", icon: "🐾", label: "Habimons" },
		{ href: "/dashboard/profile", icon: "👤", label: "Profile" },
	];
</script>

<div
	class="bg-sidebar md:border-r border-t border-t-neutral md:border-r-neutral
    flex md:flex-col flex-row
    md:py-20 py-3 md:px-0 px-5
    gap-6 items-center justify-center
    md:w-28 w-full
    md:min-h-screen fixed bottom-0 md:static text-sidebar-foreground max-md:justify-between max-md:px-10 z-999"
>
	{#each links as link}
		<a
			class="flex flex-col justify-center items-center gap-1.5"
			href={link.href}
		>
			<div
				class="aspect-square p-3 rounded-full bg-sidebar-accent drop-shadow-ms shadow-xs shadow-ring text-3xl flex justify-center items-center"
			>
				{link.icon}
			</div>
			<p class="text-sm">{link.label}</p>
		</a>
	{/each}
</div>
