import { api } from "../features/interceptors";

export async function updateTransaction(action, transactionId) {
	try {
		console.log(action, transactionId);
		const response = await api.put(`/managetrans/${transactionId}`, {
			action,
		});
		return response.data;
	} catch (error) {
		// console.log(error);
		const errMsg = error?.response?.data?.message;
		throw new Error(errMsg);
	}
}
