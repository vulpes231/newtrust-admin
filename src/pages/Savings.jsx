import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Createsavings from "./savingsmodals/Createsavings";
import { getSavingsAccounts } from "../services/savingService";

const headers = [
	{ id: "name", title: "name" },
	{ id: "title", title: "title" },
	{ id: "interestRate", title: "interest rate" },
	{ id: "createdAt", title: "date" },
	{ id: "status", title: "status" },
];

const buttons = [
	{ id: "update savings", title: "edit" },
	{ id: "delete savings", title: "delete" },
];

const Savings = () => {
	const { darkMode } = useSelector(selectNavSlice);
	const [createSavingsModal, setCreateSavingsModal] = useState(false);

	const { data, isLoading, isError } = useQuery({
		queryFn: getSavingsAccounts,
		queryKey: ["savingsAccount"],
		enabled: true,
	});

	useEffect(() => {
		document.title = "Itrust Investment | Manage Savings";
	}, []);

	// useEffect(() => {
	// 	if (data) {
	// 		console.log(data);
	// 	}
	// }, [data]);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<div className={`flex justify-end px-6`}>
				<button
					onClick={() => setCreateSavingsModal(true)}
					className={`bg-indigo-600 text-white h-[40px] px-4 rounded-sm md:rounded-md font-medium capitalize hover:bg-gradient-to-l from-[#2156be] to-indigo-600`}
				>
					add savings account
				</button>
			</div>
			<div className="p-6">
				<Table
					headers={headers}
					nullText={"You have no savings account."}
					buttons={buttons}
					data={data?.data}
					pagination={data?.trnxPagination}
				/>
			</div>
			{createSavingsModal && (
				<Createsavings onClose={() => setCreateSavingsModal(false)} />
			)}
		</div>
	);
};

export default Savings;
