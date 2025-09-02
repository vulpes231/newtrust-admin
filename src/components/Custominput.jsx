import React from "react";

const Custominput = ({ type, handleChange, value, name, label }) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={label}>{label}</label>
			<input
				type={type}
				onChange={handleChange}
				value={value}
				name={name}
				autoComplete="off"
				className="w-full h-[35px] border border-[#979797] rounded-sm md:rounded-lg"
			/>
		</div>
	);
};

export default Custominput;
