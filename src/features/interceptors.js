import axios from "axios";
import { devServer } from "../constants/constants";

const api = axios.create({
	baseURL: `${devServer}`,
});

// Request interceptor → add Authorization header if token exists
api.interceptors.request.use(
	(config) => {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			delete config.headers.Authorization;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor → handle 401 Unauthorized
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			sessionStorage.clear();

			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);

export { api };
