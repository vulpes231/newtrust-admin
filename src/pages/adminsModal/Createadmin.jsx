import React, { useEffect, useState } from "react";
import {
	Custominput,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange } from "../../constants/constants";
import { LucideX } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetCreateAdmin, selectAdminSlice } from "../../features/adminSlice";

const Createadmin = ({ onClose }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: "",
		username: "",
		password: "",
		adminRole: "",
	});
	const [error, setError] = useState("");

	const { createAdminLoading, createAdminError, adminCreated } =
		selectAdminSlice;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};

	useEffect(() => {
		if (createAdminError) {
			setError(createAdminError);
		}
	}, [createAdminError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetCreateAdmin());
				setError("");
			});
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (adminCreated) {
			timeout = setTimeout(() => {
				dispatch(resetCreateAdmin());
				onClose();
				window.location.reload();
			});
		}
		return () => clearTimeout(timeout);
	}, [adminCreated, dispatch]);

	return (
		<div className="fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center h-screen">
			<div className="max-w-2xl mx-auto bg-white dark:bg-slate-950 p-6">
				<span className="flex items-center justify-between">
					<h3>create admin</h3>
					<button onClick={onClose}>
						<LucideX />
					</button>
				</span>
				<form action="" onSubmit={handleSubmit}>
					<Custominput
						label={"username"}
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.username}
						name={"username"}
						type={"text"}
						// placeholder={}
					/>
					<Custominput
						label={"email"}
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.email}
						name={"email"}
						type={"text"}
						// placeholder={}
					/>
					<Custominput
						label={"password"}
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.password}
						name={"password"}
						type={"text"}
						// placeholder={}
					/>
					<div>
						<label htmlFor="role">Add role</label>
						<select
							name="adminRole"
							onChange={(e) => handleFormChange(e, form, setForm)}
						>
							<option value="">select role</option>
							<option value="super_user">super user</option>
						</select>
					</div>

					<button type="submit">create admin</button>
				</form>
			</div>
			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{adminCreated && (
				<Successmodal
					successText={"Admin created successfully."}
					onClose={() => dispatch(resetCreateAdmin)}
				/>
			)}
			{createAdminLoading && <Loadingmodal text={"Creating Admin..."} />}
		</div>
	);
};

export default Createadmin;
