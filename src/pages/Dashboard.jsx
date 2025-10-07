import React, { useEffect } from "react";
import { styles } from "../style";
import { Dashcontent, Sidebar } from "../components";
import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import Users from "./Users";
import Transactions from "./Transactions";
import Positions from "./Positions";
import Settings from "./Settings";
// import Profile from "./Profile";
import Admins from "./Admins";

const Dashboard = () => {
	const { activeLink } = useSelector(selectNavSlice);

	useEffect(() => {
		if (activeLink === "dashboard") {
			document.title = "Itrust Investment | Dashboard";
		}
	}, [activeLink]);
	return (
		<section
			className={`w-full grid grid-cols-4 h-screen bg-slate-200 dark:bg-slate-950 `}
		>
			<Sidebar />
			{/* <Dashcontent /> */}
			{activeLink === "dashboard" ? (
				<Dashcontent />
			) : activeLink === "admins" ? (
				<Admins />
			) : activeLink === "users" ? (
				<Users />
			) : activeLink === "transactions" ? (
				<Transactions />
			) : activeLink === "positions" ? (
				<Positions />
			) : activeLink === "settings" ? (
				<Settings />
			) : null}
		</section>
	);
};

export default Dashboard;
