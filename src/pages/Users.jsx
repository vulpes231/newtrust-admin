import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect } from "react";
import { getUsers, selectManageUserSlice } from "../features/manageUserSlice";

const headers = [
	{ id: "name", title: "name" },
	{ id: "email", title: "email" },
	{ id: "mail verified", title: "mail verified" },
	{ id: "kyc verified", title: "kyc verified" },
	{ id: "account status", title: "account status" },
];

const Users = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	const { users, pagination: userPagination } = useSelector(
		selectManageUserSlice
	);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	// useEffect(() => {
	// 	if (users) {
	// 		console.log(users);
	// 	}
	// }, [users]);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<Table headers={headers} nullText={"You have no users."} />
		</div>
	);
};

export default Users;
