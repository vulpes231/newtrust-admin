import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { getTrnxs, selectManageTrnxSlice } from "../features/manageTrnxSlice";
import { useEffect } from "react";

const headers = [
	{ id: "type", title: "type" },
	{ id: "amount", title: "amount" },
	{ id: "method", title: "method" },
	{ id: "date", title: "date" },
	{ id: "status", title: "status" },
];

const buttons = [
	{ id: "approve", title: "approve" },
	{ id: "reject", title: "reject" },
];

const Transactions = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	const { trnxs, trnxPagination } = useSelector(selectManageTrnxSlice);

	useEffect(() => {
		dispatch(getTrnxs());
	}, []);

	useEffect(() => {
		document.title = "Itrust Investment | Manage Transactions";
	}, []);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<Table
				headers={headers}
				nullText={"You have no transactions."}
				buttons={buttons}
			/>
		</div>
	);
};

export default Transactions;
