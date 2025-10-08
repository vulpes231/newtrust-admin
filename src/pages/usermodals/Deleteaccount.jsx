import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteUser, suspendUser } from "../../services/userService";
import Useractionmodal from "./Useractionmodal";

const DeleteAccount = ({ userId, user }) => {
	const [deleteActionModal, setDeleteActionModal] = useState(false);
	const [suspendActionModal, setSuspendActionModal] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const suspendMutation = useMutation({
		mutationFn: suspendUser,
		onError: (error) => {
			console.error("Failed to suspend user:", error);
		},
		onSuccess: (data) => {
			console.log("User suspended successfully:", data);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onError: (error) => {
			console.error("Failed to delete user:", error);
		},
		onSuccess: (data) => {
			console.log("User deleted successfully:", data);
		},
	});

	const handleSuspendUser = (e) => {
		e.preventDefault();
		setSuspendActionModal(true);
	};

	const handleDeleteUser = (e) => {
		e.preventDefault();
		setDeleteActionModal(true);
	};

	const isPending = suspendMutation.isPending || deleteMutation.isPending;

	return (
		<div className="flex items-center justify-center gap-4 md:gap-6">
			<button
				type="button"
				onClick={handleSuspendUser}
				disabled={isPending}
				className="h-[42px] md:h-[48px] px-4 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white flex items-center justify-center rounded-sm transition-colors duration-200 min-w-[120px]"
			>
				{user?.accountStatus?.banned ? "Unban User" : "Ban User"}
			</button>

			<button
				type="button"
				onClick={handleDeleteUser}
				disabled={isPending}
				className="h-[42px] md:h-[48px] px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white flex items-center justify-center rounded-sm transition-colors duration-200 min-w-[120px]"
			>
				{"Delete User"}
			</button>
			{suspendActionModal && (
				<Useractionmodal
					userId={userId}
					action={"Suspend"}
					handleSubmit={() => suspendMutation.mutate(userId)}
					successState={suspendMutation.isSuccess}
					loadingState={suspendMutation.isPending}
					// errorState={suspendMutation.isError}
					errMsg={errMsg}
					setErrMsg={setErrMsg}
					onClose={() => {
						suspendMutation.reset();
						setSuspendActionModal(false);
					}}
				/>
			)}
			{deleteActionModal && (
				<Useractionmodal
					userId={userId}
					action={"Delete"}
					handleSubmit={() => deleteMutation.mutate(userId)}
					successState={deleteMutation.isSuccess}
					loadingState={deleteMutation.isPending}
					// errorState={deleteMutation.isError}
					errMsg={errMsg}
					setErrMsg={setErrMsg}
					onClose={() => {
						deleteMutation.reset();
						setDeleteActionModal(false);
					}}
				/>
			)}
		</div>
	);
};

export default DeleteAccount;
