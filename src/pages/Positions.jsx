import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect, useState } from "react";
import { getPositions, selectPositionSlice } from "../features/positionSlice";
import Createtrade from "./trademodals/Createtrade";

const headers = [
	{ id: "orderType", title: "type" },
	{ id: "asset.name", title: "asset" },
	{ id: "execution.amount", title: "amount" },
	{ id: "execution.quantity", title: "quantity" },
	{ id: "performance.totalReturnPercent", title: "ROI(%)" },
	{ id: "createdAt", title: "date" },
	{ id: "status", title: "status" },
];

const buttons = [
	{ id: "edit trade", title: "edit" },
	{ id: "close trade", title: "close" },
];

const Positions = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	const { positions, tradePagination } = useSelector(selectPositionSlice);
	const [createTradeModal, setCreateTradeModal] = useState(false);

	useEffect(() => {
		document.title = "Itrust Investment | Manage Positions";
	}, []);

	useEffect(() => {
		const queryData = {
			page: 1,
			limit: 10,
			filterBy: "",
			sortBy: "",
		};
		dispatch(getPositions(queryData));
	}, [dispatch]);

	// useEffect(() => {
	// 	if (positions) {
	// 		console.log(positions);
	// 	}
	// }, [positions]);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<div className={`flex justify-end px-6`}>
				<button
					onClick={() => setCreateTradeModal(true)}
					className={`bg-indigo-600 text-white h-[40px] px-4 rounded-sm md:rounded-md font-medium capitalize hover:bg-gradient-to-l from-[#2156be] to-indigo-600`}
				>
					create trade
				</button>
			</div>
			<div className="p-6">
				<Table
					headers={headers}
					nullText={"You have no position."}
					buttons={buttons}
					data={positions}
					pagination={tradePagination}
				/>
			</div>
			{createTradeModal && (
				<Createtrade onClose={() => setCreateTradeModal(false)} />
			)}
		</div>
	);
};

export default Positions;

// gp() {
// 	git add.
// 	git commit -m $1
// 	git push origin main
// }
