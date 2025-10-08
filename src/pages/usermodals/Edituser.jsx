import {
	LucideToggleLeft,
	LucideToggleRight,
	LucideXCircle,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserInfo,
	selectManageUserSlice,
} from "../../features/manageUserSlice";
import { Custominput } from "../../components";
import { styles } from "../../style";
import Deleteaccount from "./Deleteaccount";
import { format } from "date-fns";

const Formdiv = ({ children }) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6">
			{children}
		</div>
	);
};
const Formholder = ({ children }) => {
	return <div className="flex flex-col gap-2">{children}</div>;
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

	const formattedDob =
		currentUser && format(currentUser.personalDetails?.dob, "dd/MM/yyyy");

	return (
		<div className="fixed h-screen left-0 top-0 backdrop-blur-sm bg-white/70 dark:bg-black/70 w-full flex items-center justify-center">
			<div className="w-full max-w-3xl mx-auto bg-white dark:bg-black flex flex-col p-6 gap-6 overflow-y-auto h-[600px]">
				<span className="flex items-center justify-between">
					<h3>Edit user</h3>
					<button type="button" onClick={onClose}>
						{" "}
						<LucideXCircle />
					</button>
				</span>

				<Formholder>
					<h3 className={styles.font.subheading}>Personal Information</h3>
					<Formdiv>
						<Custominput
							label={"first name"}
							value={currentUser?.name?.firstName}
							readOnly={true}
						/>
						<Custominput
							label={"last name"}
							value={currentUser?.name?.lastName}
							readOnly={true}
						/>
					</Formdiv>
					<Formdiv>
						<Custominput
							label={"email"}
							value={currentUser?.credentials?.email}
							readOnly={true}
						/>
						<Custominput
							label={"username"}
							value={currentUser?.credentials?.username}
							readOnly={true}
						/>
					</Formdiv>
				</Formholder>
				<Formholder>
					<h3 className={styles.font.subheading}>Contact Information</h3>
					<Formdiv>
						<Custominput
							label={"street"}
							value={currentUser?.contactInfo?.address?.street}
							readOnly={true}
						/>
						<Custominput
							label={"phone"}
							value={currentUser?.contactInfo?.phone}
							readOnly={true}
						/>
					</Formdiv>
					<Formdiv>
						<Custominput
							label={"city"}
							value={currentUser?.contactInfo?.address?.city}
							readOnly={true}
						/>
						<Custominput
							label={"zipcode"}
							value={currentUser?.contactInfo?.address?.zipCode}
							readOnly={true}
						/>
					</Formdiv>
				</Formholder>
				<Formholder>
					<h3 className={styles.font.subheading}>Identity Information</h3>
					<Formdiv>
						<Custominput
							label={"status"}
							value={currentUser?.identityVerification?.kycStatus}
							readOnly={true}
						/>
						<Custominput label={"dob"} value={formattedDob} />
					</Formdiv>
					<Formdiv>
						<Custominput
							label={"experience"}
							value={currentUser?.professionalInfo?.experience}
							readOnly={true}
						/>
						<Custominput
							label={"employment"}
							value={currentUser?.professionalInfo?.employment}
							readOnly={true}
						/>
					</Formdiv>
				</Formholder>

				<Formholder>
					<h3 className={styles.font.subheading}>User Settings</h3>
					<div className="flex items-center justify-between">
						<h3>
							bank deposit
							{`(${
								currentUser?.settings?.locks?.bankDeposit?.isLocked
									? "Disabled"
									: "Enabled"
							})`}
						</h3>
						{currentUser?.settings?.locks?.bankDeposit?.isLocked ? (
							<LucideToggleLeft />
						) : (
							<LucideToggleRight className="text-green-500" />
						)}
					</div>
					<div className="flex items-center justify-between">
						<h3>
							crypto deposit{" "}
							{`(${
								currentUser?.settings?.locks?.cash?.isLocked
									? "Disabled"
									: "Enabled"
							})`}
						</h3>
						{currentUser?.settings?.locks?.cash?.isLocked ? (
							<LucideToggleLeft />
						) : (
							<LucideToggleRight className="text-green-500" />
						)}
					</div>
					<div className="flex items-center justify-between">
						<h3>Options trading</h3>
						{currentUser?.settings?.trading?.isOptionsEnabled ? (
							<LucideToggleRight className="text-green-500" />
						) : (
							<LucideToggleLeft />
						)}
					</div>
					<div className="flex items-center justify-between">
						<h3>DRIP</h3>
						{currentUser?.settings?.trading?.isDripEnabled ? (
							<LucideToggleRight className="text-green-500" />
						) : (
							<LucideToggleLeft />
						)}
					</div>
					<div className="flex items-center justify-between">
						<h3>Account Status</h3>
						{currentUser?.accountStatus?.banned ? (
							<h6>Suspended</h6>
						) : (
							<h6>Active</h6>
						)}
					</div>
					<div className="flex items-center justify-between">
						<h3>Wallet Connected</h3>
						{currentUser?.settings?.wallet?.isConnected ? (
							<h6>True</h6>
						) : (
							<h6>False</h6>
						)}
					</div>
				</Formholder>
				<Deleteaccount userId={currentUser?._id} user={currentUser} />
			</div>
		</div>
	);
};

export default Edituser;
