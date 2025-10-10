// Authnav.jsx
import { LucideMoon, LucideSun, LucideUserCircle } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setDarkMode } from "../features/navSlice";
import { fade, container, card } from "../style/variants";
import { styles } from "../style";
import Usermenu from "./Usermenu";

const Authnav = () => {
	const dispatch = useDispatch();
	const { darkMode, activeLink } = useSelector(selectNavSlice);
	const [showMenu, setShowMenu] = useState(false);

	return (
		<motion.nav
			variants={fade}
			initial="hidden"
			animate="visible"
			className={`flex justify-between items-center w-full py-4 px-6 rounded-xl `}
		>
			{/* Active page title */}
			<motion.h3
				variants={card}
				className={`${styles.font.subheading} capitalize`}
			>
				{activeLink}
			</motion.h3>

			{/* Right side controls */}
			<motion.div
				variants={container}
				initial="hidden"
				animate="visible"
				className="flex items-center gap-3"
			>
				{/* Dark mode toggle */}
				<motion.button
					variants={card}
					onClick={() => dispatch(setDarkMode())}
					className={`p-2 rounded-lg transition-colors duration-300 ${
						darkMode ? "hover:bg-slate-700/40" : "hover:bg-slate-300/40"
					}`}
				>
					{darkMode ? (
						<LucideMoon className="text-yellow-400" />
					) : (
						<LucideSun className="text-blue-500" />
					)}
				</motion.button>

				{/* User Icon */}
				<motion.div
					variants={card}
					className="p-2 rounded-lg hover:bg-slate-300/20 dark:hover:bg-slate-700/30 cursor-pointer"
					onClick={() => setShowMenu((prev) => !prev)}
				>
					<LucideUserCircle className={`${styles.color.text} w-6 h-6`} />
				</motion.div>
			</motion.div>
			{showMenu && <Usermenu onClose={() => setShowMenu(false)} />}
		</motion.nav>
	);
};

export default Authnav;
