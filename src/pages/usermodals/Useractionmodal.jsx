import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { styles } from "../../style";
import { X, Trash2, CheckCircle2, Loader2 } from "lucide-react";

const Useractionmodal = ({
	action,
	userId,
	onClose,
	handleSubmit,
	loadingState,
	successState,
	errorState,
	errMsg,
	setErrMsg,
}) => {
	useEffect(() => {
		let timeout;
		if (errMsg) {
			timeout = setTimeout(() => {
				setErrMsg("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [errMsg]);

	useEffect(() => {
		let timeout;
		if (successState) {
			timeout = setTimeout(() => {
				onClose();
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [successState]);
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 40, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 40, scale: 0.9 }}
				transition={{ duration: 0.25 }}
				className={`fixed top-[80px] right-1 md:right-4 z-50 p-6 w-[320px] md:w-[380px] ${styles.color.card} ${styles.color.border} flex flex-col gap-4`}
			>
				{/* Header */}
				<div className="flex items-center justify-between">
					<h3 className={styles.font.subheading}>
						<span className="flex items-center gap-2">
							<Trash2 className="w-5 h-5 text-red-600 dark:text-red-500" />
							{action} User {userId}
						</span>
					</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</button>
				</div>

				{/* Actions */}
				<div className="flex items-center justify-end gap-3">
					<button
						onClick={onClose}
						className={`px-4 py-2 rounded-xl text-sm font-medium ${styles.color.button.secondary}`}
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						className={`px-4 py-2 rounded-xl text-sm font-medium ${styles.color.button.danger}`}
					>
						Confirm
					</button>
				</div>

				{/* Modals */}
				{errMsg && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2"
					>
						<X className="w-4 h-4" />
						{errMsg}
						<button
							onClick={() => setErrMsg("")}
							className="ml-auto text-xs underline hover:text-red-700 dark:hover:text-red-300"
						>
							Dismiss
						</button>
					</motion.div>
				)}

				{successState && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mt-2"
					>
						<CheckCircle2 className="w-4 h-4" />
						User {action}ed successfully.
						<button
							// onClick={() => dispatch(resetDeleteAdmin)}
							className="ml-auto text-xs underline hover:text-green-700 dark:hover:text-green-300"
						>
							Close
						</button>
					</motion.div>
				)}

				{loadingState && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm mt-2"
					>
						<Loader2 className="w-4 h-4 animate-spin" />
						{action}ing User...
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default Useractionmodal;
