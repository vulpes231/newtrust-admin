import React from "react";
import { motion } from "framer-motion";
import { LucideAlertCircle, LucideX } from "lucide-react";

const Errormodal = ({ error, onClose }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -30 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="fixed top-6 right-6 w-[300px] bg-red-50 dark:bg-red-900/30 
				rounded-xl shadow-lg p-4 flex flex-col gap-3 border border-red-200 dark:border-red-800"
		>
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-2">
					<LucideAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
					<h6 className="text-sm font-semibold text-red-700 dark:text-red-300">
						Error
					</h6>
				</div>
				<LucideX
					onClick={onClose}
					className="cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
				/>
			</div>
			<p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
				{error}
			</p>
		</motion.div>
	);
};

export default Errormodal;
