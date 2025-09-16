import React, { useEffect, useState } from "react";
import { styles } from "../style";

const Table = ({ data, pagination, headers, nullText, buttons }) => {
	const [currentAction, setCurrentAction] = useState("");
	const [itemId, setItemId] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddSuper, setShowAddSuper] = useState(false);
	const [showRemoveSuper, setShowRemoveSuper] = useState(false);

	const getNestedValue = (obj, path) => {
		return path.split(".").reduce((current, key) => {
			return current ? current[key] : "N/A";
		}, obj);
	};

	const handleAction = (e, item) => {
		setCurrentAction(e.target.value);
		setItemId(item);
	};

	useEffect(() => {
		if (currentAction === "delete admin") {
			// setShowDeleteModal(true);
			console.log("Delete Admin", itemId);
		} else if (currentAction === "addsu") {
			console.log("Make superuser", itemId);
		} else if (currentAction === "removesu") {
			console.log("remove superuser", itemId);
		}
	}, [currentAction]);

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
										"0001": "super",
										"0010": "admin",
									};

									const customRole = `${roleMap[role[0]]},  ${
										roleMap[role[1]]
									}`;

									return (
										<td
											key={hd.id}
											className="px-4 py-2 border border-gray-300 dark:border-slate-700"
										>
											{hd.id === "role"
												? customRole
												: getNestedValue(dt, hd.id)}
										</td>
									);
								})}
								<td className="px-4 py-2 border border-gray-300 dark:border-slate-700">
									{/* example action */}
									<select
										className="flex flex-col gap-2"
										name="currentAction"
										onChange={(e) => handleAction(e, dt._id)}
										value={currentAction}
									>
										<option value="">choose action</option>
										{buttons.length > 0 &&
											buttons.map((btn) => {
												return (
													<option key={btn.id} value={btn.id}>
														{btn.title}
													</option>
												);
											})}
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
		</div>
	);
};

export default Table;
