import { LucideAlertCircle, LucideX } from "lucide-react";
import React from "react";

const Errormodal = ({ error, onClose }) => {
	return (
		<div className="text-red-500 absolute top-0 right-5 w-[250px] bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 gap-1">
			<div className="flex justify-end w-full">
				<LucideX onClick={onClose} className="cursor-pointer w-6 h-6" />
			</div>
			<LucideAlertCircle />
			<h6 className="text-[14px] font-normal">{error}</h6>
		</div>
	);
};

export default Errormodal;
