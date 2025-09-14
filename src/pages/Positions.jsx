import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";

const headers = [
	{ id: "type", title: "type" },
	{ id: "amount", title: "amount" },
	{ id: "method", title: "method" },
	{ id: "date", title: "date" },
	{ id: "status", title: "status" },
];

const Positions = () => {
	const { darkMode } = useSelector(selectNavSlice);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<Table headers={headers} />
		</div>
	);
};

export default Positions;
