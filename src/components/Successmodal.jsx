import { LucideCheckCircle, LucideX } from "lucide-react";
import React from "react";

const Successmodal = ({ text }) => {
	return (
		<div className="text-green-500 absolute top-0 right-5 w-[250px] bg-white rounded-2xl shadow-sm">
			<div className="flex justify-end w-full">
				<LucideX onClick={onClose} className="cursor-pointer w-6 h-6" />
			</div>
			<LucideCheckCircle />
			<h6>{text}</h6>
		</div>
	);
};

export default Successmodal;
