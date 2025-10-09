import React, { useEffect, useState } from "react";
import {
	Custominput,
	Customselect,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange, supportedCoins } from "../../constants/constants";
import {
	LucideSearch,
	LucideX,
	LucideDollarSign,
	LucideEye,
	LucidePlusCircle,
	LucideUserX,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
	createTrnx,
	resetAddTrnx,
	selectManageTrnxSlice,
} from "../../features/manageTrnxSlice";
import { selectManageUserSlice } from "../../features/manageUserSlice";
import { useQuery } from "@tanstack/react-query";
import { getUserWallets } from "../../services/userService";

const Createtrans = ({ onClose }) => {
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		method: "",
		network: "",
		userId: "",
		amount: "",
		type: "",
		memo: "",
		accountId: "",
	});

	const [error, setError] = useState("");
	const [networks, setNetworks] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const { createTrnxLoading, createTrnxError, trnxCreated } = useSelector(
		selectManageTrnxSlice
	);

	const { users } = useSelector(selectManageUserSlice);

	const {
		data: wallets,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["userWallets", form.userId],
		queryFn: () => getUserWallets(form.userId),
		enabled: !!form.userId,
	});

	// handle search input
	const handleSearchUser = (e) => {
		setSearchValue(e.target.value);
	};

	// select user from search results
	const handleSelectUser = (user) => {
		setForm((prev) => ({ ...prev, userId: user._id }));
		setSearchValue(user.credentials.email);
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
		console.log(form);
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
					usr.credentials.email
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				) || [];
			setSearchResults(result);
		} else {
			setSearchResults([]);
		}
	}, [searchValue, users]);

	useEffect(() => {
		if (wallets) {
			console.log(wallets.data);
		}
	}, [wallets]);

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-auto h-[600px] ">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Create Transaction
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							Add a new deposit or withdrawal transaction
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
					{/* Transaction Type */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Transaction Type *
						</label>
						<Customselect
							label=""
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.type}
							name="type"
							optionLabel="Select transaction type"
							options={[
								{ id: "deposit", title: "Deposit" },
								{ id: "withdrawal", title: "Withdrawal" },
							]}
							className="w-full"
						/>
					</div>

					{/* Payment Method */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Payment Method *
						</label>
						<Customselect
							label=""
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.method}
							name="method"
							optionLabel="Select payment method"
							options={supportedCoins}
							className="w-full"
						/>
					</div>

					{form.method && (
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Network *
							</label>
							<Customselect
								label=""
								handleChange={(e) => handleFormChange(e, form, setForm)}
								value={form.network}
								name="network"
								optionLabel="Select network"
								options={networks}
								className="w-full"
							/>
						</div>
					)}

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Select User *
						</label>
						<div className="relative">
							<Custominput
								label=""
								handleChange={handleSearchUser}
								value={searchValue}
								name="searchValue"
								type="text"
								placeholder="Search user by email address..."
								className="w-full pr-10"
							/>
							<div className="absolute right-3 top-3">
								<LucideSearch className="w-4 h-4 text-gray-400" />
							</div>

							{/* Search Results Dropdown */}
							{searchResults.length > 0 && (
								<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg z-10">
									{searchResults.map((user) => (
										<div
											key={user._id}
											className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-150"
											onClick={() => handleSelectUser(user)}
										>
											<div className="flex flex-col">
												<span className="font-medium text-gray-900 dark:text-white">
													{user.credentials.email}
												</span>
												{user.name && (
													<span className="text-sm text-gray-500 dark:text-gray-400">
														{user.credentials.username}
													</span>
												)}
											</div>
										</div>
									))}
								</div>
							)}

							{form.userId && (
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Account *
									</label>
									<Customselect
										label=""
										handleChange={(e) => handleFormChange(e, form, setForm)}
										value={form.accountId}
										name="accountId"
										optionLabel="Select user wallet"
										options={
											wallets?.data?.map((wallet) => ({
												id: wallet._id,
												title: wallet.name,
												// You can add other properties if needed
											})) || []
										}
										className="w-full"
									/>
								</div>
							)}

							{/* No Results Message */}
							{/* {searchValue.length > 2 && searchResults.length === 0 && (
								<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 p-4 text-center">
									<LucideUserX className="w-6 h-6 text-gray-400 mx-auto mb-2" />
									<p className="text-sm text-gray-500 dark:text-gray-400">
										No users found matching "{searchValue}"
									</p>
								</div>
							)} */}
						</div>
					</div>

					{/* Amount */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Amount *
						</label>
						<div className="relative">
							<Custominput
								label=""
								handleChange={(e) => handleFormChange(e, form, setForm)}
								value={form.amount}
								name="amount"
								type="number"
								placeholder="0.00"
								step="0.01"
								min="0"
								className="w-full pl-8"
							/>
							<div className="absolute left-3 top-3">
								<LucideDollarSign className="w-4 h-4 text-gray-400" />
							</div>
						</div>
						{form.method && (
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Amount in {form.method.toUpperCase()}
							</p>
						)}
					</div>

					{/* Summary Preview */}
					{form.type && form.method && form.amount && (
						<div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
							<h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
								<LucideEye className="w-4 h-4" />
								Transaction Summary
							</h4>
							<div className="space-y-1 text-sm">
								<div className="flex justify-between">
									<span className="text-indigo-700 dark:text-indigo-300">
										Type:
									</span>
									<span className="font-medium text-indigo-900 dark:text-indigo-100 capitalize">
										{form.type}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-indigo-700 dark:text-indigo-300">
										Method:
									</span>
									<span className="font-medium text-indigo-900 dark:text-indigo-100 uppercase">
										{form.method}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-indigo-700 dark:text-indigo-300">
										Amount:
									</span>
									<span className="font-medium text-indigo-900 dark:text-indigo-100">
										{form.amount} {form.method.toUpperCase()}
									</span>
								</div>
							</div>
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={createTrnxLoading}
						className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
					>
						{createTrnxLoading ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Creating Transaction...
							</>
						) : (
							<>
								<LucidePlusCircle className="w-4 h-4" />
								Create Transaction
							</>
						)}
					</button>
				</form>
			</div>

			{/* Modals */}
			{error && <Errormodal error={error} onClose={() => setError("")} />}

			{trnxCreated && (
				<Successmodal
					successText="Transaction created successfully"
					onClose={() => dispatch(resetAddTrnx())}
				/>
			)}
		</div>
	);
};

export default Createtrans;
