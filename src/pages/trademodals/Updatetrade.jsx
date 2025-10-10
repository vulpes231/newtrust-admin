import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getPositionInfo,
	resetUpdatePosition,
	selectPositionSlice,
	updatePosition,
} from "../../features/positionSlice";
import { LucideX } from "lucide-react";
import { Custominput, Errormodal, Successmodal } from "../../components";
import { handleFormChange } from "../../constants/constants";

const Updatetrade = ({ tradeId, onClose }) => {
	const dispatch = useDispatch();
	const {
		positionInfo,
		updatePositionLoading,
		updatePositionError,
		positionUpdated,
	} = useSelector(selectPositionSlice);

	const [form, setForm] = useState({
		extra: "",
		leverage: "",
		sl: "",
		tp: "",
	});
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			extra: form.extra,
			leverage: form.leverage,
			sl: form.sl,
			tp: form.tp,
			tradeId: positionInfo._id,
		};
		console.log(data);
		dispatch(updatePosition(data));
	};

	useEffect(() => {
		if (tradeId) {
			dispatch(getPositionInfo(tradeId));
		}
	}, [tradeId, dispatch]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetUpdatePosition());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (positionUpdated) {
			timeout = setTimeout(() => {
				dispatch(resetUpdatePosition());
				onClose();
				window.location.reload();
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [positionUpdated, dispatch, onClose]);

	// useEffect(() => {
	// 	if (positionInfo) {
	// 		console.log(positionInfo);
	// 	}
	// }, [positionInfo]);
	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-scroll h-[600px]">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Update Trade Position
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							edit buy or sell position
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
					>
						<LucideX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="space-y-2 p-6">
					<Custominput
						label="Order Type"
						// handleChange={(e) => handleFormChange(e, form, setForm)}
						value={positionInfo?.orderType}
						readOnly={true}
						name="orderType"
						className="w-full"
					/>
					<Custominput
						label="Asset Name"
						// handleChange={(e) => handleFormChange(e, form, setForm)}
						value={positionInfo?.asset?.name}
						readOnly={true}
						name="name"
						className="w-full"
					/>
					<Custominput
						label="Current Value"
						// handleChange={(e) => handleFormChange(e, form, setForm)}
						value={positionInfo?.performance?.currentValue}
						readOnly={true}
						name="quantity"
						className="w-full"
					/>
					<Custominput
						label="Quantity"
						// handleChange={(e) => handleFormChange(e, form, setForm)}
						value={positionInfo?.execution?.amount}
						readOnly={true}
						name="amount"
						className="w-full"
					/>
					<Custominput
						label="extra"
						handleChange={(e) => handleFormChange(e, form, setForm)}
						value={form.extra}
						name="extra"
						className="w-full"
					/>
					<button
						type="submit"
						disabled={updatePositionLoading}
						className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
					>
						{updatePositionLoading ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Updating Position...
							</>
						) : (
							<>Update Position</>
						)}
					</button>
				</form>
			</div>
			{/* Modals */}
			{error && <Errormodal error={error} onClose={() => setError("")} />}
			{positionUpdated && (
				<Successmodal
					successText="Position created successfully"
					onClose={() => dispatch(resetUpdatePosition())}
				/>
			)}
		</div>
	);
};

export default Updatetrade;
