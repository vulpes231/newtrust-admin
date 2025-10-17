import { api } from "../features/interceptors";

export async function logoutAdmin() {
	try {
		const response = await api.put("/manageadmin/logout");
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}

export async function changeAdminEmail() {
	try {
		const response = await api.put("/manageadmin");
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}
