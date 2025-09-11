import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getAdminLoading: false,
	getAdminError: null,
	adminInfo: null,
};

export const getAdminInfo = createAsyncThunk(
	"admin/getAdminInfo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/admin");
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

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminInfo.pending, (state) => {
				state.getAdminLoading = true;
			})
			.addCase(getAdminInfo.fulfilled, (state, action) => {
				state.getAdminLoading = false;
				state.getAdminError = null;
				state.adminInfo = action.payload.data;
			})
			.addCase(getAdminInfo.rejected, (state, action) => {
				state.getAdminLoading = false;
				state.getAdminError = action.payload.message || action.error.message;
				state.adminInfo = null;
			});
	},
});

export const selectAdminSlice = (state) => state.admin;
export const selectAdmin = (state) => state.admin.adminInfo;
export default adminSlice.reducer;
