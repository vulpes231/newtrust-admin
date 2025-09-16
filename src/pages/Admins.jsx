import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect, useState } from "react";

import {
	getAdminInfo,
	getAllAdmins,
	selectAdminSlice,
} from "../features/adminSlice";
import Createadmin from "./adminsModal/Createadmin";
import { styles } from "../style";

const headers = [
	{ id: "username", title: "username" },
	{ id: "email", title: "email" },
	{ id: "role", title: "role" },
];

const buttons = [
	{ id: "addsu", title: "make SU" },
	{ id: "removesu", title: "unmake SU" },
	{ id: "delete admin", title: "delete" },
];

const Admins = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	const { admins, adminInfo } = useSelector(selectAdminSlice);

	const [createAdminModal, setCreateAdminModal] = useState(false);

	useEffect(() => {
		dispatch(getAllAdmins());
		dispatch(getAdminInfo());
	}, []);

	// useEffect(() => {
	// 	if (adminInfo) {
	// 		console.log(adminInfo.role);
	// 	}
	// }, [adminInfo]);

	useEffect(() => {
		document.title = "Itrust Investment | Manage Admins";
	}, []);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<div
				className={
					adminInfo && adminInfo.role.includes("0001")
						? "flex justify-end p-6"
						: "hidden"
				}
			>
				<button
					onClick={() => setCreateAdminModal(true)}
					className={`${styles.color.accent} h-[40px] px-4 rounded-sm md:rounded-md font-medium capitalize hover:bg-gradient-to-l from-[#2156be] to-indigo-600`}
				>
					create admin
				</button>
			</div>
			<Table
				headers={headers}
				nullText={"You have no admins."}
				buttons={buttons}
				data={admins}
			/>
			{createAdminModal && (
				<Createadmin onClose={() => setCreateAdminModal(false)} />
			)}
		</div>
	);
};

export default Admins;
