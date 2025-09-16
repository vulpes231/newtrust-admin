import React from "react";
import { useDispatch } from "react-redux";

const Deleteadmin = ({ itemId, onClose }) => {
	const dispatch = useDispatch();
	return (
		<div className="fixed top-[80px] right-1 md:right-2.5 p-6 flex flex-col gap-6 bg-white dark:bg-slate-950">
			<h3>Delete Admin{itemId}</h3>
			<div className="flex items-center justify-between">
				<button>confirm</button>
				<button onClick={onClose}>cancel</button>
			</div>
		</div>
	);
};

export default Deleteadmin;
