import React from "react";

const CustomInput = ({
	type,
	handleChange,
	value,
	name,
	label,
	placeholder,
}) => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<label
				htmlFor={name}
				className="text-sm capitalize font-medium text-gray-600 dark:text-gray-300"
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				autoComplete="off"
				className="w-full px-3 py-2 text-md md:text-base rounded-lg border border-gray-300 dark:border-gray-600 
					bg-slate-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100
					focus:outline-none focus:ring-2 focus:ring-[#2156be] focus:border-[#2156be]
					transition duration-200 ease-in-out h-[46px]"
			/>
		</div>
	);
};

export default CustomInput;
