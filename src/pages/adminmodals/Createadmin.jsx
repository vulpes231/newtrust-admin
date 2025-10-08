import React, { useEffect, useState } from "react";
import {
	Custominput,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange } from "../../constants/constants";
import { LucideInfo, LucideUserPlus, LucideX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
	createNewAdmin,
	resetCreateAdmin,
	selectAdminSlice,
} from "../../features/adminSlice";
import { styles } from "../../style";

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
		useSelector(selectAdminSlice);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		dispatch(createNewAdmin(form));
	};

	useEffect(() => {
		if (createAdminError) {
			setError(createAdminError);
		}
	}, [createAdminError]);
	// console.log(adminCreated);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetCreateAdmin());
				setError("");
			}, 3000);
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
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [adminCreated, dispatch]);

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Create New Admin
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							Add a new administrator to the system
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
					>
						<LucideX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Username Field */}
					<div className="space-y-2">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Username *
						</label>
						<Custominput
							label={""}
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.username}
							name={"username"}
							type={"text"}
							required={true}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
						/>
					</div>

					{/* Email Field */}
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Email Address *
						</label>
						<Custominput
							label={""}
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.email}
							name={"email"}
							type={"email"}
							required={true}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
						/>
					</div>

					{/* Password Field */}
					<div className="space-y-2">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Password *
						</label>
						<Custominput
							label={""}
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.password}
							name={"password"}
							type={"password"}
							required={true}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
						/>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Password must be at least 8 characters with letters and numbers
						</p>
					</div>

					{/* Role Selection */}
					<div className="space-y-2">
						<label
							htmlFor="adminRole"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Admin Role{" "}
							<span className="text-gray-500 text-sm font-normal">
								(Optional)
							</span>
						</label>
						<select
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none cursor-pointer"
							name="adminRole"
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.adminRole}
						>
							<option value="" className="text-gray-500">
								Select a role
							</option>
							<option
								value="super_user"
								className="text-gray-900 dark:text-gray-100"
							>
								Super user
							</option>
							{/* <option
								value="admin"
								className="text-gray-900 dark:text-gray-100"
							>
								Administrator
							</option>
							<option
								value="moderator"
								className="text-gray-900 dark:text-gray-100"
							>
								Moderator
							</option> */}
						</select>
						<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
							<span>Leave empty for default permissions</span>
							<span className="flex items-center gap-1">
								<LucideInfo className="w-3 h-3" />
								Learn more
							</span>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={createAdminLoading}
						className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{createAdminLoading ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Creating Admin...
							</>
						) : (
							<>
								<LucideUserPlus className="w-4 h-4" />
								Create Admin Account
							</>
						)}
					</button>
				</form>
			</div>

			{/* Modals */}
			{error && <Errormodal error={error} onClose={() => setError("")} />}

			{adminCreated && (
				<Successmodal
					successText={"Admin account created successfully"}
					onClose={() => dispatch(resetCreateAdmin)}
				/>
			)}
		</div>
	);
};

export default Createadmin;
