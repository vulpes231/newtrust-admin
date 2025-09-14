import React from "react";
import { styles } from "../style";

const Table = ({ data, pagination, headers }) => {
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

				<tbody className="bg-white/30 dark:bg-slate-950/30 backdrop-blur-md border border-white/20 dark:border-slate-700/30 shadow-md">
					{data && data.length > 0 ? (
						data.map((dt, index) => (
							<tr key={index} className="hover:bg-gray-50">
								{headers.map((hd) => (
									<td
										key={hd.id}
										className="px-4 py-2 border border-gray-300 dark:border-slate-700"
									>
										{dt[hd.key]}
									</td>
								))}
								<td className="px-4 py-2 border border-gray-300 dark:border-slate-700">
									{/* example action */}
									<button className="text-blue-600">Edit</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={headers.length + 1}
								className="p-20 text-center text-gray-500"
							>
								You have no users.
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
