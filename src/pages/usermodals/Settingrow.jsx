import React from "react";
import { LucideToggleLeft, LucideToggleRight } from "lucide-react";

const Settingrow = ({ label, enabled, handleClick }) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-gray-700 dark:text-gray-300">{label}</span>
		<div className="flex items-center gap-2">
			<span
				className={`text-sm ${enabled ? "text-green-600" : "text-gray-500"}`}
			>
				{enabled ? "Enabled" : "Disabled"}
			</span>
			<button onClick={handleClick}>
				{enabled ? (
					<LucideToggleRight className="w-6 h-6 text-green-500" />
				) : (
					<LucideToggleLeft className="w-6 h-6 text-gray-400" />
				)}
			</button>
		</div>
	</div>
);

export default Settingrow;
