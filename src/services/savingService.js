import { api } from "../features/interceptors";

export async function getSavingsAccounts() {
	try {
		const response = await api.get("/managesavings");
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}
export async function getSavingsInfo(accountId) {
	try {
		const response = await api.get(`/managesavings/${accountId}`);
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}

export async function searchCountries(query) {
	try {
		const response = await api.get(`/location/search?query=${query}`);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Search failed");
	}
}

export async function createSavings(formData) {
	try {
		const response = await api.post("/managesavings", formData);
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}

export async function updateSavingsAccount(formData) {
	const { accountId } = formData;
	try {
		const response = await api.put(`/managesavings/${accountId}`, formData);
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}

export async function deleteSavingsAccount(accountId) {
	try {
		const response = await api.delete(`/managesavings/${accountId}`);
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}
