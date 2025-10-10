import { api } from "../features/interceptors";

export async function getSavingsAccounts() {
	try {
		const response = await api.get("/managesavings");
		return response.data;
	} catch (error) {
		const errMsg = error.response?.message?.data;
		throw new Error(errMsg);
	}
}

export async function searchCountries(query) {
	try {
		const response = await api.get(`/location/search?query=${query}`);
		// console.log(response.data);
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
		const errMsg = error.response?.message?.data;
		throw new Error(errMsg);
	}
}
