import React from "react";

const Deleteaccount = () => {
	return (
		<div className="flex items-center justify-center gap-6">
			<button className="h-[42px] md:h-[48px] p-4 bg-yellow-600 flex items-center justify-center rounded-sm">
				suspend
			</button>
			<button className="h-[42px] md:h-[48px] p-4 bg-red-600 flex items-center justify-center rounded-sm">
				delete
			</button>
		</div>
	);
};

export default Deleteaccount;
