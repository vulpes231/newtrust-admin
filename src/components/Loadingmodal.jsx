import React from "react";
import { motion } from "framer-motion";
const Loadingmodal = ({ text }) => {
	return (
		<div className="w-full h-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center">
			<div>
				<motion.div />
				<h6>{text}</h6>
			</div>
		</div>
	);
};

export default Loadingmodal;
