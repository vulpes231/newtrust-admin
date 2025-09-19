export const styles = {
	font: {
		text: "text-[#333] dark:text-[#fff] text-md md:text-base",
		heading:
			"text-2xl md:text-3xl font-semibold text-[#111] dark:text-[#f9fafb]",
		subheading: "text-lg md:text-xl font-medium text-[#444] dark:text-gray-300",
	},
	color: {
		background: "bg-slate-200 dark:bg-slate-950",
		card: "bg-[#fff] dark:bg-slate-800/70 shadow-md rounded-xl rounded-2xl",
		border: "border border-slate-300 dark:border-slate-700",
		text: "text-[#333] dark:text-[#f9fafb]",
		mutedText: "text-gray-600 dark:text-gray-400",

		button: {
			primary:
				"bg-[#2156be] hover:bg-[#2156be]/90 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
			secondary:
				"bg-slate-300 hover:bg-slate-400 text-black dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white",
			danger:
				"bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600",
			success:
				"bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600",
		},

		link: {
			base: "text-blue-600 dark:text-blue-400 hover:underline",
			muted:
				"text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300",
		},

		accent: "bg-gradient-to-r from-[#2156be] to-indigo-600 text-white",
		highlight: "bg-yellow-200 dark:bg-yellow-500/30",
	},
	section: "p-6 w-full max-w-5xl mx-auto",
};
