import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setDarkMode } from "../features/navSlice";
import { LucideMoon, LucideSun } from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	return (
		<header className="flex items-center justify-center w-full fixed top-0 left-0 h-[80px] bg-[#fff] dark:bg-slate-900 text-[#333] dark:text-[#fff]">
			<nav className="w-full max-w-5xl mx-auto flex justify-between p-6">
				<Logo />
				<span>
					<button onClick={() => dispatch(setDarkMode())}>
						{!darkMode ? <LucideSun /> : <LucideMoon />}
					</button>
				</span>
			</nav>
		</header>
	);
};

export default Navbar;
