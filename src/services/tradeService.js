import { api } from "../features/interceptors";

export const searchAssets = async (query) => {
	try {
		const response = await api.get(`/asset/search?query=${query}`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Search failed");
	}
};
