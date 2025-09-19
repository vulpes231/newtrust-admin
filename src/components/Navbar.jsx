import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setDarkMode } from "../features/navSlice";
import { LucideMoon, LucideSun } from "lucide-react";
import Logo from "./Logo";
import { styles } from "../style";

const Navbar = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);

	return (
		<header className="flex items-center justify-center h-[80px] top-0 left-0 bg-slate-100 dark:bg-slate-800 text-[#333] dark:text-[#f0f0f0] fixed w-full">
			<nav className="w-full max-w-7xl mx-auto flex items-center justify-between p-6">
				<Logo />
				<span>
					<button onClick={() => dispatch(setDarkMode())}>
						{!darkMode ? (
							<LucideSun
								className={`${
									!darkMode ? styles.color.accent : ""
								} rounded-full w-7 h-7 p-1`}
							/>
						) : (
							<LucideMoon
								className={`${
									darkMode ? styles.color.accent : ""
								} rounded-full w-7 h-7 p-1`}
							/>
						)}
					</button>
				</span>
			</nav>
		</header>
	);
};

export default Navbar;
