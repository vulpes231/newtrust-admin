import React, { useEffect, useState } from "react";
import {
	Custominput,
	Customselect,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange, supportedCoins } from "../../constants/constants";
import { LucideX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../style";
import {
	createTrnx,
	resetAddTrnx,
	selectManageTrnxSlice,
} from "../../features/manageTrnxSlice";
import { selectManageUserSlice } from "../../features/manageUserSlice";
import { title } from "framer-motion/client";

const Createtrans = ({ onClose }) => {
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		method: "",
		network: "",
		userId: "",
		amount: "",
		type: "",
	});
	const [error, setError] = useState("");
	const [networks, setNetworks] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const { createTrnxLoading, createTrnxError, trnxCreated } = useSelector(
		selectManageTrnxSlice
	);

	const { users } = useSelector(selectManageUserSlice);

	// handle search input
	const handleSearchUser = (e) => {
		setSearchValue(e.target.value);
	};

	// select user from search results
	const handleSelectUser = (user) => {
		setForm((prev) => ({ ...prev, userId: user.id }));
		setSearchValue(user.email);
		setSearchResults([]);
	};

	// submit transaction
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.userId) {
			setError("Please select a user.");
			return;
		}
		if (!form.method || !form.network || !form.amount) {
			setError("All fields are required.");
			return;
		}
		dispatch(createTrnx(form));
	};

	useEffect(() => {
		if (createTrnxError) {
			setError(createTrnxError);
		}
	}, [createTrnxError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetAddTrnx());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (trnxCreated) {
			timeout = setTimeout(() => {
				dispatch(resetAddTrnx());
				onClose();
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [trnxCreated, dispatch, onClose]);

	useEffect(() => {
		if (form.method) {
			const coin = supportedCoins.find((c) => c.id === form.method);
			setNetworks(coin ? coin.network : []);
		}
	}, [form.method]);

	useEffect(() => {
		if (searchValue.length > 2) {
			const result =
				users?.filter((usr) =>
					usr.email.toLowerCase().includes(searchValue.toLowerCase())
				) || [];
			setSearchResults(result);
		} else {
			setSearchResults([]);
		}
	}, [searchValue, users]);

	return (
		<div className="fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center h-screen w-full p-4 md:p-0">
			<div className="max-w-md mx-auto bg-white dark:bg-slate-950 p-6 md:p-10 w-full flex flex-col gap-6 border border-slate-300 dark:border-slate-700 rounded-lg md:rounded-2xl">
				<span className="flex items-center justify-between">
					<h3 className={`${styles.font.heading} capitalize`}>
						create transaction
					</h3>
					<button onClick={onClose}>
						<LucideX />
					</button>
				</span>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Customselect
						label="type"
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.type}
						name="type"
						optionLabel="Select type"
						options={[
							{ id: "deposit", title: "deposit" },
							{ id: "withdrawal", title: "withdrawal" },
						]}
					/>

					<Customselect
						label="method"
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.method}
						name="method"
						optionLabel="Select deposit method"
						options={supportedCoins}
					/>

					{form.method && (
						<Customselect
							label="network"
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.network}
							name="network"
							optionLabel="Select network"
							options={networks}
						/>
					)}

					<div className="relative">
						<Custominput
							label="select user"
							handleChange={handleSearchUser}
							value={searchValue}
							name="searchValue"
							type="text"
							placeholder="Search by email"
						/>
						{searchResults.length > 0 && (
							<div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
								{searchResults.map((res) => (
									<div
										key={res.id}
										className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
										onClick={() => handleSelectUser(res)}
									>
										{res.email}
									</div>
								))}
							</div>
						)}
						{searchValue.length > 2 && searchResults.length < 1 && (
							<h6 className="absolute top-full mt-1 text-sm text-red-500">
								No results found
							</h6>
						)}
					</div>

					<Custominput
						label="amount"
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.amount}
						name="amount"
						type="number"
						placeholder="Enter amount"
					/>

					<button
						className={`${styles.color.accent} h-[48px] px-4 rounded-sm md:rounded-md font-medium capitalize hover:bg-gradient-to-l from-[#2156be] to-indigo-600 mt-5 cursor-pointer`}
						type="submit"
					>
						create transaction
					</button>
				</form>
			</div>

			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{trnxCreated && (
				<Successmodal
					successText="Transaction created successfully."
					onClose={() => dispatch(resetAddTrnx())}
				/>
			)}
			{createTrnxLoading && <Loadingmodal text="Creating transaction..." />}
		</div>
	);
};

export default Createtrans;
