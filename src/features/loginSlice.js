import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	token: null,
	loginLoading: false,
	loginError: null,
};

export const loginAdmin = createAsyncThunk(
	"login/loginAdmin",
	async (formData, { rejectWithValue }) => {
		console.log("sending");
		try {
			const response = await api.post("/login", formData);

			console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || {
					message: error.message,
					statusCode: error.statusCode,
				}
			);
		}
	}
);

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetLogin(state) {
			state.loginError = null;
			state.token = null;
			state.loginLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAdmin.pending, (state) => {
				state.loginLoading = true;
			})
			.addCase(loginAdmin.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.token = action.payload.token;
				state.loginError = null;
				sessionStorage.setItem("token", action.payload.token);
			})
			.addCase(loginAdmin.rejected, (state, action) => {
				state.loginLoading = false;
				state.token = null;
				state.loginError =
					action.payload?.message || action.error.message || "Login failed";
			});
	},
});

export const selectLoginSlice = (state) => state.login;
export const selectUserToken = (state) => state.login.token;

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
