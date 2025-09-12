import React, { useEffect, useState } from "react";
import { sideBarLinks } from "../constants/constants";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setActiveLink } from "../features/navSlice";

const Sidebar = () => {
	const dispatch = useDispatch();
	const { activeLink } = useSelector(selectNavSlice);

	return (
		<aside className="hidden lg:block col-span-1 bg-slate-950 dark:bg-slate-950 text-[#fff] dark:text-slate-300 p-2">
			<div>
				<div className="mb-10">
					<Logo />
				</div>
				<div className="flex flex-col gap-4">
					{sideBarLinks.map((link) => {
						return (
							<span
								className={`${
									activeLink === link.id ? "bg-[#2156be] px-10" : ""
								} cursor-pointer py-3 px-5 rounded-md`}
								onClick={() => dispatch(setActiveLink(link.id))}
								key={link.id}
							>
								{link.name}
							</span>
						);
					})}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
