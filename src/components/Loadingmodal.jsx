import React from "react";
import { motion } from "framer-motion";

const Loadingmodal = ({ text }) => {
	return (
		<div className="w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center z-[1000]">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="bg-white dark:bg-slate-900/80 rounded-2xl shadow-lg p-8 flex flex-col items-center"
			>
				{/* Spinner */}
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
					className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
				/>

				{/* Text */}
				<h6 className="text-lg font-medium text-gray-700 dark:text-gray-200">
					{text || "Loading..."}
				</h6>
			</motion.div>
		</div>
	);
};

export default Loadingmodal;
