// variants.js
const fade = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4,
			ease: "easeInOut",
		},
	},
};

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 20,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
		transition: { duration: 0.3 },
	},
};

// variants.js

// Slide in from the right
const slideRight = {
	hidden: {
		x: "100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 20,
		},
	},
	exit: {
		x: "100vw",
		opacity: 0,
		transition: { duration: 0.3 },
	},
};

// Slide in from the left
const slideLeft = {
	hidden: {
		x: "-100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 20,
		},
	},
	exit: {
		x: "-100vw",
		opacity: 0,
		transition: { duration: 0.3 },
	},
};

// Staggered container for child animations
const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

// Child card animation
const card = {
	hidden: { y: 40, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
		},
	},
};

export { fade, dropIn, slideLeft, slideRight, container, card };
