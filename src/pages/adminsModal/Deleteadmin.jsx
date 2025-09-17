import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteAdmin,
	resetDeleteAdmin,
	selectAdminSlice,
} from "../../features/adminSlice";
import { Errormodal, Loadingmodal, Successmodal } from "../../components";

const Deleteadmin = ({ itemId, onClose }) => {
	const dispatch = useDispatch();

	const [error, setError] = useState("");

	const { deleteAdminLoading, deleteAdminError, adminDeleted } =
		useSelector(selectAdminSlice);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(itemId);
		const data = { adminId: itemId };
		dispatch(deleteAdmin(data));
	};

	useEffect(() => {
		if (deleteAdminError) {
			setError(deleteAdminError);
		}
	}, [deleteAdminError]);
	// console.log(adminCreated);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetDeleteAdmin());
				setError("");
			});
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (adminDeleted) {
			timeout = setTimeout(() => {
				dispatch(resetDeleteAdmin());
				onClose();
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [adminDeleted, dispatch]);
	return (
		<div className="fixed top-[80px] right-1 md:right-2.5 p-6 flex flex-col gap-6 bg-white dark:bg-slate-950">
			<h3>Delete Admin{itemId}</h3>
			<div className="flex items-center justify-between">
				<button type="button" onClick={handleSubmit}>
					confirm
				</button>
				<button onClick={onClose}>cancel</button>
			</div>
			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{adminDeleted && (
				<Successmodal
					successText={"Admin deleted successfully."}
					onClose={() => dispatch(resetDeleteAdmin)}
				/>
			)}
			{deleteAdminLoading && <Loadingmodal text={"Deleting Admin..."} />}
		</div>
	);
};

export default Deleteadmin;
