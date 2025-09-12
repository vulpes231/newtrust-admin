import { useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { Authnav } from "../components";

const Settings = () => {
	const { darkMode } = useSelector(selectNavSlice);
	return (
		<div className="col-span-4 lg:col-span-3 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
			<Authnav darkMode={darkMode} />
		</div>
	);
};

export default Settings;
