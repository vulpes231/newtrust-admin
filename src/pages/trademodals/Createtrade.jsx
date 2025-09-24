import React, { useEffect, useState } from "react";
import {
	Custominput,
	Customselect,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../../components";
import { handleFormChange } from "../../constants/constants";
import { LucideX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../style";
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

const Createtrade = ({ onClose }) => {
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

	const { createPositionLoading, createPositionError, positionCreated } =
		useSelector(selectPositionSlice);

	const { users } = useSelector(selectManageUserSlice);
	const assets = useSelector(selectAssets);

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
	const handleSelectAsset = (asset) => {
		setForm((prev) => ({ ...prev, assetId: asset.id }));
		setAssetValue(asset.name);
		setAssetResults([]);
	};

	// submit transaction
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
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [positionCreated, dispatch, onClose]);

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

	useEffect(() => {
		if (assetValue.length > 2 && assets && assets.length > 0) {
			const result =
				assets?.filter((asset) =>
					asset.name.toLowerCase().includes(assetValue.toLowerCase())
				) || [];
			setAssetResults(result);
		} else {
			setAssetResults([]);
		}
	}, [assetValue, assets]);

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getAllAssets());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (form.userId) {
	// 		dispatch()
	// 	}

	// }, [dispatch]);

	useEffect(() => {
		if (assets) {
			console.log(assets);
		}
	}, [assets]);

	return (
		<div className="fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center h-screen w-full p-4 md:p-0">
			<div className="max-w-md mx-auto bg-white dark:bg-slate-950 p-6 md:p-10 w-full flex flex-col gap-6 border border-slate-300 dark:border-slate-700 rounded-lg md:rounded-2xl">
				<span className="flex items-center justify-between">
					<h3 className={`${styles.font.heading} capitalize`}>
						create position
					</h3>
					<button onClick={onClose}>
						<LucideX />
					</button>
				</span>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Customselect
						label="order type"
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.type}
						name="type"
						optionLabel="Select order type"
						options={[
							{ id: "buy", title: "buy" },
							{ id: "sell", title: "sell" },
						]}
					/>
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
								No user found
							</h6>
						)}
					</div>
					<div className="relative">
						<Custominput
							label="select asset"
							handleChange={handleSearchUser}
							value={searchValue}
							name="searchValue"
							type="text"
							placeholder="Search by asset name"
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
								No asset found
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
						create position
					</button>
				</form>
			</div>

			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{trnxCreated && (
				<Successmodal
					successText="Position created successfully."
					onClose={() => dispatch(resetCreatePosition())}
				/>
			)}
			{createPositionLoading && <Loadingmodal text="Creating position..." />}
		</div>
	);
};

export default Createtrade;
