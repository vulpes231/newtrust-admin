import React from "react";
import { styles } from "../style";
import { Dashcontent, Sidebar } from "../components";
import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import Users from "./Users";
import Transactions from "./Transactions";
import Positions from "./Positions";
import Settings from "./Settings";
import Profile from "./Profile";

const Dashboard = () => {
	const { activeLink } = useSelector(selectNavSlice);
	return (
		<section className={`w-full grid grid-cols-4 h-screen bg-green-200`}>
			<Sidebar />
			{/* <Dashcontent /> */}
			{activeLink === "dashboard" ? (
				<Dashcontent />
			) : activeLink === "users" ? (
				<Users />
			) : activeLink === "transactions" ? (
				<Transactions />
			) : activeLink === "positions" ? (
				<Positions />
			) : activeLink === "settings" ? (
				<Settings />
			) : activeLink === "profile" ? (
				<Profile />
			) : null}
		</section>
	);
};

export default Dashboard;
