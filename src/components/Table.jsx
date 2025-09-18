import React, { useEffect, useState } from "react";
import { styles } from "../style";
import Deleteadmin from "../pages/adminsModal/Deleteadmin";
import Updaterole from "../pages/adminsModal/Updaterole";

const Table = ({ data, pagination, headers, nullText, buttons }) => {
	const [itemId, setItemId] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
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
		return path.split(".").reduce((current, key) => {
			return current ? current[key] : "N/A";
		}, obj);
	};

	useEffect(() => {
		if (rowActions[itemId] === "delete admin") {
			// setShowDeleteModal(true);
			// console.log("Delete Admin", itemId);
			setShowDeleteModal(true);
		} else if (
			rowActions[itemId] === "addsu" ||
			rowActions[itemId] === "removesu"
		) {
			console.log("update role", rowActions[itemId], itemId);
			setShowUpdateRole({ status: true, action: rowActions[itemId] });
		}
	}, [rowActions]);

	return (
		<div className="overflow-x-auto p-4">
			<table className="min-w-full border-collapse border border-gray-300 dark:border-slate-700">
				<thead className="bg-gray-100 dark:bg-slate-950">
					<tr>
						{headers.map((hd) => (
							<th
								key={hd.id}
								className={`${styles.font.text} ${styles.color.mutedText} px-4 py-2 border border-gray-300 dark:border-slate-700 text-left capitalize`}
							>
								{hd.title}
							</th>
						))}
						<th
							className={`${styles.font.text} ${styles.color.mutedText} px-4 py-2 border border-gray-300 dark:border-slate-700 text-left capitalize`}
						>
							Action
						</th>
					</tr>
				</thead>

				<tbody className="bg-white dark:bg-slate-950 backdrop-blur-md border border-white/20 dark:border-slate-700/30 shadow-md">
					{data && data.length > 0 ? (
						data.map((dt, index) => (
							<tr key={index} className="">
								{headers.map((hd) => {
									const role = dt[hd.id];
									const roleMap = {
										"0001": "superuser",
										"0010": "admin",
									};

									// console.log("roles", dt);

									const customRole = Array.isArray(role)
										? role.map((rl, index) => {
												return (
													<div key={index}>
														<h6
															className={`${
																roleMap[rl] === "superuser"
																	? "bg-red-600/20"
																	: "bg-green-600/20 "
															} py-1 px-2 rounded-xl`}
														>
															{roleMap[rl]}
														</h6>
													</div>
												);
										  })
										: null;

									return (
										<td
											key={hd.id}
											className="px-4 py-2 border border-gray-300 dark:border-slate-700"
										>
											<div className="flex items-center gap-2 whitespace-nowrap w-full">
												{hd.id === "role"
													? customRole
													: getNestedValue(dt, hd.id)}
											</div>
										</td>
									);
								})}
								<td className="px-4 py-2 border border-gray-300 dark:border-slate-700">
									{/* example action */}
									<select
										className="flex flex-col gap-2"
										name="currentAction"
										onChange={(e) => handleAction(e, dt._id)}
										value={rowActions[dt._id] || ""} // row-specific
									>
										<option value="">choose action</option>
										{buttons.map((btn) => (
											<option key={btn.id} value={btn.id}>
												{btn.title}
											</option>
										))}
									</select>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={headers.length + 1}
								className="p-20 text-center text-gray-500"
							>
								{nullText}
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className="flex justify-between items-center p-6 w-full">
				<span>
					Page {pagination?.currentPage || 1} of {pagination?.totalPage || 1}
				</span>
				<span className="space-x-2">
					<button className="px-3 py-1 border border-gray-300 dark:border-slate-700 rounded">
						Prev
					</button>
					<button className="px-3 py-1 border border-gray-300 dark:border-slate-700 rounded">
						Next
					</button>
				</span>
			</div>
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
		</div>
	);
};

export default Table;
