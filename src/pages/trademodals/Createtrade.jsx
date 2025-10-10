import React, { useEffect, useState } from "react";
import {
	Custominput,
	Customselect,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange } from "../../constants/constants";
import { LucideX, LucideSearch, LucideDollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUsers,
	selectManageUserSlice,
} from "../../features/manageUserSlice";
import {
	createPosition,
	resetCreatePosition,
	selectPositionSlice,
} from "../../features/positionSlice";
import { getAllAssets, selectAssets } from "../../features/assetSlice";
import { searchAssets } from "../../services/tradeService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { getUserWallets } from "../../services/userService";

const CreateTrade = ({ onClose }) => {
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		userId: "",
		walletId: "",
		assetId: "",
		amount: "",
		orderType: "",
	});

	const [error, setError] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [assetResults, setAssetResults] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [assetValue, setAssetValue] = useState("");
	const [debouncedAssetValue] = useDebounce(assetValue, 300);

	const { createPositionLoading, createPositionError, positionCreated } =
		useSelector(selectPositionSlice);
	const { users } = useSelector(selectManageUserSlice);

	const handleSearchUser = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSearchAsset = (e) => {
		setAssetValue(e.target.value);
	};

	const handleSelectUser = (user) => {
		setForm((prev) => ({ ...prev, userId: user._id }));
		setSearchValue(user.credentials?.email || user.email || "");
		setSearchResults([]);
	};

	const handleSelectAsset = (asset) => {
		setForm((prev) => ({ ...prev, assetId: asset._id }));
		setAssetValue(asset.name || asset.symbol || "");
		setAssetResults([]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.userId) {
			setError("Please select a user.");
			return;
		}
		if (!form.assetId) {
			setError("Please select an asset.");
			return;
		}
		if (!form.orderType || !form.amount) {
			setError("All fields are required.");
			return;
		}
		dispatch(createPosition(form));
		console.log(form);
	};

	useEffect(() => {
		if (createPositionError) {
			setError(createPositionError);
		}
	}, [createPositionError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetCreatePosition());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (positionCreated) {
			timeout = setTimeout(() => {
				dispatch(resetCreatePosition());
				onClose();
				window.location.reload();
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [positionCreated, dispatch, onClose]);

	// User search effect
	useEffect(() => {
		if (searchValue.length > 2) {
			const result =
				users?.filter((user) => {
					const email = user.credentials?.email || user.email || "";
					return email.toLowerCase().includes(searchValue.toLowerCase());
				}) || [];
			setSearchResults(result);
		} else {
			setSearchResults([]);
		}
	}, [searchValue, users]);

	const {
		data,
		isLoading: assetSearchLoading,
		error: assetSearchError,
	} = useQuery({
		queryKey: ["searchAssets", debouncedAssetValue],
		queryFn: () => searchAssets(debouncedAssetValue),
		enabled: debouncedAssetValue.length > 2,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const {
		data: wallets,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["userWallets", form.userId],
		queryFn: () => getUserWallets(form.userId),
		enabled: !!form.userId,
	});

	useEffect(() => {
		if (data) {
			const assetsToSet = Array.isArray(data.data)
				? data.data
				: Array.isArray(data)
				? data
				: [];

			setAssetResults(assetsToSet);
		} else {
			setAssetResults([]);
		}
	}, [data]);

	useEffect(() => {
		if (assetSearchError) {
			setAssetResults([]);
		}
	}, [assetSearchError]);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-scroll h-[700px]">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Create Trade Position
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							Open a new buy or sell position
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
					{/* Order Type */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Order Type *
						</label>
						<Customselect
							label=""
							handleChange={(e) => handleFormChange(e, form, setForm)}
							value={form.orderType}
							name="orderType"
							optionLabel="Select order type"
							options={[
								{ id: "buy", title: "Buy" },
								{ id: "sell", title: "Sell" },
							]}
							className="w-full"
						/>
					</div>

					{/* User Search */}
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
								placeholder="Search user by email..."
								className="w-full pr-10"
							/>
							<div className="absolute right-3 top-3">
								<LucideSearch className="w-4 h-4 text-gray-400" />
							</div>

							{/* User Search Results */}
							{searchResults.length > 0 && (
								<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg z-50">
									{searchResults.map((user) => (
										<div
											key={user._id}
											className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-150"
											onClick={() => handleSelectUser(user)}
										>
											<div className="flex flex-col">
												<span className="font-medium text-gray-900 dark:text-white">
													{user.credentials?.email || user.email}
												</span>
												{user.name && (
													<span className="text-sm text-gray-500 dark:text-gray-400">
														{user.name.firstName} {user.name.lastName}
													</span>
												)}
											</div>
										</div>
									))}
								</div>
							)}

							{/* No Users Found */}
							{searchValue.length > 2 &&
								searchResults.length === 0 &&
								!form.userId && (
									<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 p-4 text-center shadow-lg z-50">
										<LucideSearch className="w-6 h-6 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500 dark:text-gray-400">
											No users found matching "{searchValue}"
										</p>
									</div>
								)}
						</div>
					</div>

					{/* Asset Search */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Select Asset *
						</label>
						<div className="relative">
							<Custominput
								label=""
								handleChange={handleSearchAsset}
								value={assetValue}
								name="assetValue"
								type="text"
								placeholder="Search asset by name or symbol..."
								className="w-full pr-10"
							/>
							<div className="absolute right-3 top-3">
								<LucideSearch className="w-4 h-4 text-gray-400" />
							</div>

							{/* Asset Search Results */}
							{assetResults.length > 0 && (
								<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg z-50">
									{assetResults.map((asset) => (
										<div
											key={asset._id}
											className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-150"
											onClick={() => handleSelectAsset(asset)}
										>
											<div className="flex justify-between items-center">
												<div className="flex flex-col">
													<span className="font-medium text-gray-900 dark:text-white">
														{asset.name}
													</span>
													<span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
														{asset.symbol}
													</span>
												</div>
												{asset.currentPrice && (
													<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
														${asset.currentPrice}
													</span>
												)}
											</div>
										</div>
									))}
								</div>
							)}

							{/* No Assets Found */}
							{!assetSearchLoading &&
								assetValue.length > 2 &&
								assetResults.length === 0 &&
								!form.assetId && (
									<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 p-4 text-center shadow-lg z-50">
										<LucideSearch className="w-6 h-6 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-500 dark:text-gray-400">
											No assets found matching "{assetValue}"
										</p>
									</div>
								)}
						</div>
					</div>

					{form.userId && (
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Account *
							</label>
							<Customselect
								label=""
								handleChange={(e) => handleFormChange(e, form, setForm)}
								value={form.walletId}
								name="walletId"
								optionLabel="Select user wallet"
								options={
									wallets?.data?.map((wallet) => ({
										id: wallet._id,
										title: wallet.name,
									})) || []
								}
								className="w-full"
							/>
						</div>
					)}

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
								step="0.0001"
								min="0"
								className="w-full pl-8"
							/>
							<div className="absolute left-3 top-3">
								<LucideDollarSign className="w-4 h-4 text-gray-400" />
							</div>
						</div>
					</div>

					{/* Summary Preview */}
					{form.orderType && form.assetId && form.amount && (
						<div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
							<h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">
								Position Summary
							</h4>
							<div className="space-y-1 text-sm">
								<div className="flex justify-between">
									<span className="text-indigo-700 dark:text-indigo-300">
										Order Type:
									</span>
									<span className="font-medium text-indigo-900 dark:text-indigo-100 capitalize">
										{form.orderType}
									</span>
								</div>
								{form.assetId && (
									<div className="flex justify-between">
										<span className="text-indigo-700 dark:text-indigo-300">
											Asset:
										</span>
										<span className="font-medium text-indigo-900 dark:text-indigo-100">
											{assetValue}
										</span>
									</div>
								)}
								<div className="flex justify-between">
									<span className="text-indigo-700 dark:text-indigo-300">
										Amount:
									</span>
									<span className="font-medium text-indigo-900 dark:text-indigo-100">
										${form.amount}
									</span>
								</div>
							</div>
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={createPositionLoading}
						className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
					>
						{createPositionLoading ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Creating Position...
							</>
						) : (
							<>Create Position</>
						)}
					</button>
				</form>
			</div>

			{/* Modals */}
			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{positionCreated && (
				<Successmodal
					successText="Position created successfully"
					onClose={() => dispatch(resetCreatePosition())}
				/>
			)}
		</div>
	);
};

export default CreateTrade;
