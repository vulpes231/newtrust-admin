import React from "react";
import { motion } from "framer-motion";
import { LucideCheck, LucideX } from "lucide-react";

const Successmodal = ({ successText, onClose }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -30 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="fixed top-6 right-6 w-[300px] bg-green-50 dark:bg-green-900/30 
				rounded-xl shadow-lg p-4 flex flex-col gap-3 border border-green-200 dark:border-green-800"
		>
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-2">
					<LucideCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
					<h6 className="text-sm font-semibold text-green-700 dark:text-green-300">
						Success
					</h6>
				</div>
				<LucideX
					onClick={onClose}
					className="cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
				/>
			</div>
			<p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
				{successText}
			</p>
		</motion.div>
	);
};

export default Successmodal;
