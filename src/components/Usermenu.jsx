import React, { useEffect, useRef, useState } from "react";
import { userMenuLinks } from "../constants/constants";
import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../services/adminProfileService";
import {
	LucideLogOut,
	LucideUser,
	LucideSettings,
	LucideHelpCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setActiveLink } from "../features/navSlice";

const Usermenu = ({ onClose }) => {
	const dispatch = useDispatch();
	const menuRef = useRef(null);
	const [error, setError] = useState("");
	const mutation = useMutation({
		mutationFn: () => logoutAdmin(),
		onError: (err) => {
			console.log(err);
			setError(err);
		},
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const handleLogout = (e) => {
		e.preventDefault();
		mutation.mutate();
	};

	const getIcon = (name) => {
		switch (name.toLowerCase()) {
			case "profile":
				return <LucideUser className="w-4 h-4" />;
			case "settings":
				return <LucideSettings className="w-4 h-4" />;
			case "help":
				return <LucideHelpCircle className="w-4 h-4" />;
			default:
				return <LucideUser className="w-4 h-4" />;
		}
	};

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError("");
				mutation.reset();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (mutation.isSuccess) {
			timeout = setTimeout(() => {
				setError("");
				mutation.reset();
				sessionStorage.clear();
				localStorage.clear();
				window.location.href = "/";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [mutation.isSuccess]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={menuRef}
			className="fixed top-16 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-48 z-50"
		>
			{/* User Info Header */}
			<div className="flex items-center gap-3 px-2 py-3 border-b border-gray-100 dark:border-gray-600 mb-2">
				<div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
					<LucideUser className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
				</div>
				<div className="flex flex-col">
					<span className="text-sm font-medium text-gray-900 dark:text-white">
						Admin User
					</span>
					<span className="text-xs text-gray-500 dark:text-gray-400">
						Administrator
					</span>
				</div>
			</div>

			{/* Menu Links */}
			<div className="flex flex-col gap-1">
				{userMenuLinks.map((link) => (
					<button
						key={link.id}
						onClick={() => dispatch(setActiveLink(link.id))}
						className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
					>
						{getIcon(link.name)}
						<span className="capitalize">{link.name}</span>
					</button>
				))}
			</div>

			{/* Logout Button */}
			<div className="border-t border-gray-100 dark:border-gray-600 mt-2 pt-2">
				<button
					onClick={handleLogout}
					disabled={mutation.isPending}
					className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<LucideLogOut className="w-4 h-4" />
					<span>{mutation.isPending ? "Logging out..." : "Logout"}</span>
				</button>
			</div>

			{/* Error Message */}
			{error && (
				<div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<p className="text-sm text-red-600 dark:text-red-400 text-center">
						{error.message || "Logout failed"}
					</p>
				</div>
			)}
		</div>
	);
};

export default Usermenu;
