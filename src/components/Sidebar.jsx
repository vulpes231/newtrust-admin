// Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { sideBarLinks } from "../constants/constants";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setActiveLink } from "../features/navSlice";
import { slideLeft, container, card } from "../style/variants";
import { styles } from "../style";
import {
	LucideArrowDownCircle,
	LucideCircleDollarSign,
	LucideCog,
	LucideHome,
	LucideUserCog,
	LucideUserLock,
} from "lucide-react";

const Sidebar = () => {
	const dispatch = useDispatch();
	const { activeLink } = useSelector(selectNavSlice);

	return (
		<motion.aside
			variants={slideLeft}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`hidden lg:block col-span-1 bg-gray-800 dark:bg-slate-950 text-[#fff] dark:text-slate-300 p-4 shadow-lg`}
		>
			<div className="flex flex-col gap-10">
				<div className="flex items-center justify-center">
					<Logo />
				</div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="visible"
					className="flex flex-col gap-2"
				>
					{sideBarLinks.map((link) => {
						const icon =
							link.id === "dashboard" ? (
								<LucideHome />
							) : link.id === "admins" ? (
								<LucideUserCog />
							) : link.id === "users" ? (
								<LucideUserLock />
							) : link.id === "transactions" ? (
								<LucideCircleDollarSign />
							) : link.id === "positions" ? (
								<LucideArrowDownCircle />
							) : link.id === "settings" ? (
								<LucideCog />
							) : link.id === "verifications" ? (
								<LucideUserLock />
							) : null;
						return (
							<motion.span
								variants={card}
								key={link.id}
								onClick={() => dispatch(setActiveLink(link.id))}
								className={`cursor-pointer py-3 px-5 rounded-lg transition-colors duration-300 
								${
									activeLink === link.id
										? `${styles.color.accent} font-medium shadow-md`
										: `hover:bg-slate-300/20 dark:hover:bg-slate-700/30`
								} capitalize flex items-center gap-2`}
							>
								{icon}
								{link.name}
							</motion.span>
						);
					})}
				</motion.div>
			</div>
		</motion.aside>
	);
};

export default Sidebar;
