import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect } from "react";
import { getAllAdmins, selectAdmins } from "../features/adminSlice";

const headers = [
	{ id: "username", title: "username" },
	{ id: "email", title: "email" },
	{ id: "role", title: "role" },
];

const buttons = [
	{ id: "add", title: "make SU" },
	{ id: "remove", title: "unmake SU" },
	{ id: "delete", title: "delete" },
];

const Admins = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	const admins = useSelector(selectAdmins);

	useEffect(() => {
		dispatch(getAllAdmins());
	}, []);

	useEffect(() => {
		if (admins) {
			console.log(admins);
		}
	}, [admins]);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<Table
				headers={headers}
				nullText={"You have no admins."}
				buttons={buttons}
				data={admins}
			/>
		</div>
	);
};

export default Admins;
