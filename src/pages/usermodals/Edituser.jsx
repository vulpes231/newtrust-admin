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
		<div className="fixed inset-0 backdrop-blur-sm bg-white/70 dark:bg-black/70 z-50 flex items-center justify-center p-4">
			<div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
						User Details
					</h3>
					<button
						type="button"
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
					>
						<LucideXCircle className="w-6 h-6 text-gray-500 dark:text-gray-400" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-6 space-y-6">
					{/* Personal Information */}
					<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
							Personal Information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Custominput
								label="First Name"
								value={currentUser?.name?.firstName}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Last Name"
								value={currentUser?.name?.lastName}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Email Address"
								value={currentUser?.credentials?.email}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Username"
								value={currentUser?.credentials?.username}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
						</div>
					</div>

					{/* Contact Information */}
					<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
							Contact Information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Custominput
								label="Street Address"
								value={currentUser?.contactInfo?.address?.street}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Phone Number"
								value={currentUser?.contactInfo?.phone}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="City"
								value={currentUser?.contactInfo?.address?.city}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Zip Code"
								value={currentUser?.contactInfo?.address?.zipCode}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
						</div>
					</div>

					{/* Identity Information */}
					<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
							Identity Information
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Custominput
								label="KYC Status"
								value={currentUser?.identityVerification?.kycStatus}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Date of Birth"
								value={formattedDob}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Experience Level"
								value={currentUser?.professionalInfo?.experience}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
							<Custominput
								label="Employment Status"
								value={currentUser?.professionalInfo?.employment}
								readOnly={true}
								className="bg-white dark:bg-gray-700"
							/>
						</div>
					</div>

					{/* User Settings */}
					<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
							Account Settings
						</h4>
						<div className="space-y-4">
							{/* Deposit Settings */}
							<div className="space-y-3">
								<h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
									Deposit Settings
								</h5>
								<SettingRow
									label="Bank Deposits"
									enabled={!currentUser?.settings?.locks?.bankDeposit?.isLocked}
								/>
								<SettingRow
									label="Crypto Deposits"
									enabled={!currentUser?.settings?.locks?.cash?.isLocked}
								/>
							</div>

							{/* Trading Settings */}
							<div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
								<h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
									Trading Features
								</h5>
								<SettingRow
									label="Options Trading"
									enabled={currentUser?.settings?.trading?.isOptionsEnabled}
								/>
								<SettingRow
									label="DRIP Feature"
									enabled={currentUser?.settings?.trading?.isDripEnabled}
								/>
							</div>

							{/* Account Status */}
							<div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
								<h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
									Account Status
								</h5>
								<div className="flex items-center justify-between py-2">
									<span className="text-gray-700 dark:text-gray-300">
										Account Status
									</span>
									<StatusBadge
										status={
											currentUser?.accountStatus?.banned
												? "suspended"
												: "active"
										}
									/>
								</div>
								<div className="flex items-center justify-between py-2">
									<span className="text-gray-700 dark:text-gray-300">
										Wallet Connected
									</span>
									<StatusBadge
										status={
											currentUser?.settings?.wallet?.isConnected
												? "connected"
												: "disconnected"
										}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
						<h4 className="text-lg font-medium text-red-900 dark:text-red-100 mb-4">
							Account Management
						</h4>
						<Deleteaccount userId={currentUser?._id} user={currentUser} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Edituser;

// Helper Components
const SettingRow = ({ label, enabled }) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-gray-700 dark:text-gray-300">{label}</span>
		<div className="flex items-center gap-2">
			<span
				className={`text-sm ${enabled ? "text-green-600" : "text-gray-500"}`}
			>
				{enabled ? "Enabled" : "Disabled"}
			</span>
			{enabled ? (
				<LucideToggleRight className="w-6 h-6 text-green-500" />
			) : (
				<LucideToggleLeft className="w-6 h-6 text-gray-400" />
			)}
		</div>
	</div>
);

const StatusBadge = ({ status }) => {
	const statusConfig = {
		active: {
			color:
				"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
			text: "Active",
		},
		suspended: {
			color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
			text: "Suspended",
		},
		connected: {
			color:
				"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
			text: "Connected",
		},
		disconnected: {
			color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
			text: "Disconnected",
		},
	};

	const config = statusConfig[status] || statusConfig.disconnected;

	return (
		<span
			className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
		>
			{config.text}
		</span>
	);
};
