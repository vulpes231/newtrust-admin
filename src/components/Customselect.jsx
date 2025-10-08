import React from "react";

const Customselect = ({
	optionLabel,
	options,
	label,
	name,
	value,
	handleChange,
}) => {
	return (
		<div>
			<label
				htmlFor={label}
				className="text-sm capitalize font-medium text-gray-600 dark:text-gray-300"
			>
				{label}
			</label>
			<select
				name={name}
				value={value}
				onChange={handleChange}
				className="w-full px-3 py-2 text-md md:text-base rounded-lg border border-gray-300 dark:border-gray-600 
					bg-slate-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100
					focus:outline-none focus:ring-2 focus:ring-[#2156be] focus:border-[#2156be]
					transition duration-200 ease-in-out h-[46px]"
			>
				<option value="">{optionLabel}</option>
				{options &&
					options.length > 0 &&
					options.map((opt, index) => {
						return (
							<option
								key={opt.id || opt._id || index}
								value={opt.id || opt._id || opt || index}
							>
								{opt.title || opt}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default Customselect;
