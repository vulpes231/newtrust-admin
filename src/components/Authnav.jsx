import { LucideMoon, LucideSun, LucideUserCircle } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setDarkMode } from "../features/navSlice";

const Authnav = () => {
	const dispatch = useDispatch();

	const { darkMode, activeLink } = useSelector(selectNavSlice);

	return (
		<div className="flex justify-between w-full p-2">
			<h3>{activeLink}</h3>
			<span className="flex items-center gap-2">
				<button onClick={() => dispatch(setDarkMode())}>
					{!darkMode ? <LucideSun /> : <LucideMoon />}
				</button>
				<LucideUserCircle />
			</span>
		</div>
	);
};

export default Authnav;
