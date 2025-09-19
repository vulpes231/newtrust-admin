import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav, Table } from "../components";
import { useEffect } from "react";
import {
	fetchAllPositions,
	selectPositionSlice,
} from "../features/positionSlice";

const headers = [
	{ id: "type", title: "type" },
	{ id: "amount", title: "amount" },
	{ id: "method", title: "method" },
	{ id: "date", title: "date" },
	{ id: "status", title: "status" },
];

const buttons = [
	{ id: "edit", title: "edit" },
	{ id: "close", title: "close" },
];

const Positions = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector(selectNavSlice);
	const { positions, tradePagination } = useSelector(selectPositionSlice);

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
		dispatch(fetchAllPositions(queryData));
	}, [dispatch]);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col gap-6 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
			<Table
				headers={headers}
				nullText={"You have no position."}
				buttons={buttons}
				data={positions}
			/>
		</div>
	);
};

export default Positions;
