import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";

const headers = [
	{ id: "name", title: "name" },
	{ id: "email", title: "email" },
	{ id: "mail verified", title: "mail verified" },
	{ id: "kyc verified", title: "kyc verified" },
	{ id: "account status", title: "account status" },
];

const Users = () => {
	const { darkMode } = useSelector(selectNavSlice);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<Table headers={headers} />
		</div>
	);
};

export default Users;
