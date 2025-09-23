import React, { useEffect, useState } from "react";
import {
	Custominput,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange } from "../../constants/constants";
import { LucideX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../style";
import {
	createUser,
	resetAddUser,
	selectManageUserSlice,
} from "../../features/manageUserSlice";

const Createuser = ({ onClose }) => {
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		email: "",
		username: "",
		password: "",
		adminRole: "",
	});
	const [error, setError] = useState("");

	const { addUserLoading, addUserError, userAdded } = useSelector(
		selectManageUserSlice
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		dispatch(createUser(form));
	};

	useEffect(() => {
		if (addUserError) {
			setError(addUserError);
		}
	}, [addUserError]);
	// console.log(adminCreated);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetAddUser());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (userAdded) {
			timeout = setTimeout(() => {
				dispatch(resetAddUser());
				onClose();
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [userAdded, dispatch]);

	return (
		<div className="fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center h-screen w-full p-4 md:p-0">
			<div className="max-w-md mx-auto bg-white dark:bg-slate-950 p-6 md:p-10 w-full flex flex-col gap-6 border border-slate-300 dark:border-slate-700 rounded-lg md:rounded-2xl">
				<span className="flex items-center justify-between">
					<h3 className={`${styles.font.heading} capitalize`}>create admin</h3>
					<button onClick={onClose}>
						<LucideX />
					</button>
				</span>
				<form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
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
						type={"password"}
						// placeholder={}
					/>
					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="role">
							Add role <i>(Optional)</i>
						</label>
						<select
							className="w-full px-3 py-2 text-md md:text-base rounded-lg border border-gray-300 dark:border-gray-600 
							bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100
							focus:outline-none focus:ring-2 focus:ring-[#2156be] focus:border-[#2156be]
							transition duration-200 ease-in-out shadow-sm h-[46px]"
							name="adminRole"
							onChange={(e) => handleFormChange(e, form, setForm)}
						>
							<option value="">select role</option>
							<option value="super_user">superuser</option>
						</select>
					</div>

					<button
						className={`${styles.color.accent} h-[48px] px-4 rounded-sm md:rounded-md font-medium capitalize hover:bg-gradient-to-l from-[#2156be] to-indigo-600 mt-5 cursor-pointer`}
						type="submit"
					>
						create user
					</button>
				</form>
			</div>
			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{userAdded && (
				<Successmodal
					successText={"User created successfully."}
					onClose={() => dispatch(resetAddUser)}
				/>
			)}
			{addUserLoading && <Loadingmodal text={"Creating user..."} />}
		</div>
	);
};

export default Createuser;

// resetAddUser
