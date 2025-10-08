import React, { useEffect, useState } from "react";
import { styles } from "../style";
import Deleteadmin from "../pages/adminmodals/Deleteadmin";
import Updaterole from "../pages/adminmodals/Updaterole";
import Edituser from "../pages/usermodals/Edituser";

const Table = ({ data, pagination, headers, nullText, buttons }) => {
	const [itemId, setItemId] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const [showUpdateRole, setShowUpdateRole] = useState({
		status: false,
		action: "",
	});

	const [rowActions, setRowActions] = useState({}); // { rowId: actionValue }

	const handleAction = (e, id) => {
		setRowActions((prev) => ({
			...prev,
			[id]: e.target.value,
		}));
		setItemId(id);
	};

	const getNestedValue = (obj, path) => {
		try {
			const value = path.split(".").reduce((current, key) => {
				return current && current[key] !== undefined ? current[key] : null;
			}, obj);

			// Ensure we never return an object
			if (value === null || value === undefined) {
				return "N/A";
			}

			if (typeof value === "object" && !Array.isArray(value)) {
				// For objects, you might want to display a specific field or stringify
				return Object.keys(value).length > 0 ? JSON.stringify(value) : "N/A";
			}

			return value;
		} catch (error) {
			console.error("Error accessing nested value:", error);
			return "N/A";
		}
	};

	useEffect(() => {
		if (rowActions[itemId] === "delete admin") {
			setShowDeleteModal(true);
		} else if (
			rowActions[itemId] === "addsu" ||
			rowActions[itemId] === "removesu"
		) {
			console.log("update role", rowActions[itemId], itemId);
			setShowUpdateRole({ status: true, action: rowActions[itemId] });
		} else if (rowActions[itemId] === "edit user") {
			// console.log("Edit user", itemId);
			setShowUserModal(true);
		}
	}, [rowActions]);

	return (
		<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
			{/* Table Container */}
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					{/* Table Header */}
					<thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
						<tr>
							{headers.map((hd) => (
								<th
									key={hd.id}
									className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
								>
									{hd.title}
								</th>
							))}
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
						{data && data.length > 0 ? (
							data.map((dt, index) => (
								<tr
									key={index}
									className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
								>
									{headers.map((hd) => {
										const role = dt[hd.id];
										const roleMap = {
											"0001": "superuser",
											"0010": "admin",
										};

										const customRole = Array.isArray(role)
											? role.map((rl, index) => {
													const roleType = roleMap[rl];
													const roleConfig = {
														superuser: {
															bg: "bg-red-100 dark:bg-red-900/30",
															text: "text-red-800 dark:text-red-300",
															label: "Superuser",
														},
														admin: {
															bg: "bg-green-100 dark:bg-green-900/30",
															text: "text-green-800 dark:text-green-300",
															label: "Admin",
														},
													};
													const config = roleConfig[roleType] || {
														bg: "bg-gray-100 dark:bg-gray-800",
														text: "text-gray-800 dark:text-gray-300",
														label: roleType,
													};

													return (
														<span
															key={index}
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} mr-1 mb-1`}
														>
															{config.label}
														</span>
													);
											  })
											: null;

										return (
											<td
												key={hd.id}
												className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
											>
												{hd.id === "role" ? (
													<div className="flex flex-wrap gap-1">
														{customRole}
													</div>
												) : (
													<span className="font-medium">
														{getNestedValue(dt, hd.id)}
													</span>
												)}
											</td>
										);
									})}

									{/* Actions Column */}
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<select
												className="block w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 dark:text-gray-100"
												name="currentAction"
												onChange={(e) => handleAction(e, dt._id)}
												value={rowActions[dt._id] || ""}
											>
												<option value="" className="text-gray-500">
													Choose action...
												</option>
												{buttons.map((btn) => (
													<option
														key={btn.id}
														value={btn.id}
														className="text-gray-900 dark:text-gray-100"
													>
														{btn.title}
													</option>
												))}
											</select>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={headers.length + 1}
									className="px-6 py-24 text-center"
								>
									<div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
										<div className="w-16 h-16 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
											<svg
												className="w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
												/>
											</svg>
										</div>
										<p className="text-lg font-medium mb-2">No data found</p>
										<p className="text-sm">{nullText}</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
				<div className="text-sm text-gray-700 dark:text-gray-300">
					Page{" "}
					<span className="font-semibold">{pagination?.currentPage || 1}</span>{" "}
					of <span className="font-semibold">{pagination?.totalPage || 1}</span>
				</div>

				<div className="flex space-x-2">
					<button
						onClick={() => {
							/* Add previous page handler */
						}}
						disabled={!pagination?.hasPrev}
						className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
					>
						Previous
					</button>
					<button
						onClick={() => {
							/* Add next page handler */
						}}
						disabled={!pagination?.hasNext}
						className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
					>
						Next
					</button>
				</div>
			</div>
			{/* Modals */}
			{showDeleteModal && (
				<Deleteadmin
					itemId={itemId}
					onClose={() => {
						setRowActions({});
						setShowDeleteModal(false);
					}}
				/>
			)}

			{showUpdateRole.status && (
				<Updaterole
					itemId={itemId}
					action={showUpdateRole.action}
					data={data}
					onClose={() => {
						setRowActions({});
						setShowUpdateRole({
							status: false,
							action: "",
						});
					}}
				/>
			)}

			{showUserModal && (
				<Edituser
					userId={itemId}
					onClose={() => {
						setRowActions({});
						setShowUserModal(false);
					}}
				/>
			)}
		</div>
	);
};

export default Table;
