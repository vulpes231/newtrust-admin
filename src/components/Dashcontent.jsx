import React from "react";
// import Authnav from "./Authnav";
Authnav;
import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import Authnav from "./Authnav";
import Chart from "./Chart";
import Table from "./Table";
import { styles } from "../style";

const headers = [
	{ id: "name", title: "name" },
	{ id: "email", title: "email" },
	{ id: "mail verified", title: "mail verified" },
	{ id: "kyc verified", title: "kyc verified" },
	{ id: "account status", title: "account status" },
];

const Dashcontent = () => {
	const { darkMode } = useSelector(selectNavSlice);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<div className="p-4 flex flex-col gap-8">
				<Chart />
				<div>
					<h3 className={`${styles.font.subheading} py-4 px-6`}>
						Recent Transactions
					</h3>
					<Table headers={headers} nullText={"You have no transactions."} />
				</div>
			</div>
		</div>
	);
};

export default Dashcontent;
