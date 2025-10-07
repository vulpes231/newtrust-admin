import { LucideXCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserInfo,
	selectManageUserSlice,
} from "../../features/manageUserSlice";
import { Custominput } from "../../components";

const Formdiv = ({ children }) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6">
			{children}
		</div>
	);
};

const Edituser = ({ userId, onClose }) => {
	const dispatch = useDispatch();

	const { currentUser } = useSelector(selectManageUserSlice);

	useEffect(() => {
		if (userId) {
			dispatch(getUserInfo(userId));
		}
	}, [userId]);

	useEffect(() => {
		if (currentUser) {
			console.log(currentUser);
		}
	}, [currentUser]);

	return (
		<div className="fixed h-screen left-0 top-0 backdrop-blur-sm bg-white/70 dark:bg-black/70 w-full">
			<div className="w-full max-w-4xl mx-auto bg-white dark:bg-black flex flex-col gap-6">
				<span className="flex items-center justify-between">
					<h3>Edit user</h3>
					<button type="button" onClick={onClose}>
						{" "}
						<LucideXCircle />
					</button>
				</span>

				<div>
					<h3>Personal Information</h3>
					<Formdiv>
						<Custominput label={"first name"} />
						<Custominput label={"last name"} />
					</Formdiv>
					<Formdiv>
						<Custominput label={"email"} />
						<Custominput label={"username"} />
					</Formdiv>
				</div>
				<div>
					<h3>Contact Information</h3>
					<Formdiv>
						<Custominput label={"street"} />
						<Custominput label={"phone"} />
					</Formdiv>
					<Formdiv>
						<Custominput label={"city"} />
						<Custominput label={"zipcode"} />
					</Formdiv>
				</div>
				<div>
					<h3>Identity Information</h3>
					<Formdiv>
						<Custominput label={"status"} />
						<Custominput label={"dob"} />
					</Formdiv>
					<Formdiv>
						<Custominput label={"experience"} />
						<Custominput label={"employment"} />
					</Formdiv>
				</div>
			</div>
		</div>
	);
};

export default Edituser;
