import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { getTrnxs, selectManageTrnxSlice } from "../features/manageTrnxSlice";
import { useEffect, useState } from "react";
import { styles } from "../style";
import Createtrans from "./transmodal/Createtrans";

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
	const [createTrnxModal, setCreateTrnxModal] = useState(false);

	useEffect(() => {
		dispatch(getTrnxs());
	}, []);

	useEffect(() => {
		document.title = "Itrust Investment | Manage Transactions";
	}, []);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<div className={`flex justify-end px-6`}>
				<button
					onClick={() => setCreateTrnxModal(true)}
					className={`bg-indigo-600 text-white h-[40px] px-4 rounded-sm md:rounded-md font-medium capitalize hover:bg-gradient-to-l from-[#2156be] to-indigo-600`}
				>
					create transaction
				</button>
			</div>
			<div className="p-6">
				<Table
					headers={headers}
					nullText={"You have no transactions."}
					buttons={buttons}
					data={trnxs}
					pagination={trnxPagination}
				/>
			</div>
			{createTrnxModal && (
				<Createtrans onClose={() => setCreateTrnxModal(false)} />
			)}
		</div>
	);
};

export default Transactions;
