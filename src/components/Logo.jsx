import React from "react";
import { LucideActivity } from "lucide-react";

const Logo = () => {
	return (
		<div className="flex items-center gap-2">
			<LucideActivity />
			<h1 className="font-black text-[24px] md:text-[28px]">iTrust Admin</h1>
		</div>
	);
};

export default Logo;
