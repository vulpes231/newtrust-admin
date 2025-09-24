import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav } from "../components";
import { useEffect } from "react";

const Verifications = () => {
	const { darkMode } = useSelector(selectNavSlice);
	useEffect(() => {
		document.title = "Itrust Investment | Manage Verifications";
	}, []);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300 h-screen overflow-auto">
			<Authnav darkMode={darkMode} />
		</div>
	);
};

export default Verifications;
