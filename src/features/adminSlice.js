import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getAdminLoading: false,
	getAdminError: null,
	adminInfo: null,
	getAllAdminLoading: false,
	getAllAdminError: null,
	admins: null,
	updateAdminLoading: false,
	updateAdminError: null,
	adminUpdated: false,
	createAdminLoading: false,
	createAdminError: null,
	adminCreated: false,
};

export const getAdminInfo = createAsyncThunk(
	"admin/getAdminInfo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get(`/manageadmin`);
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

export const getAllAdmins = createAsyncThunk(
	"admin/getAllAdmins",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/manageadmin/all");
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

export const makeSuperUser = createAsyncThunk(
	"admin/makeSuperUser",
	async (formData, { rejectWithValue }) => {
		try {
			const { adminId } = formData;
			const response = await api.post(`/manageadmin/${adminId}`, formData);
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

export const createNewAdmin = createAsyncThunk(
	"admin/createNewAdmin",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post(`/login`, formData);
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
	reducers: {
		resetUpdateAdmin(state) {
			state.updateAdminLoading = false;
			state.updateAdminError = null;
			state.adminUpdated = false;
		},
		resetCreateAdmin(state) {
			state.createAdminLoading = false;
			state.createAdminError = null;
			state.adminCreated = false;
		},
	},
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
		builder
			.addCase(getAllAdmins.pending, (state) => {
				state.getAllAdminLoading = true;
			})
			.addCase(getAllAdmins.fulfilled, (state, action) => {
				state.getAllAdminLoading = false;
				state.getAllAdminError = null;
				state.admins = action.payload.data;
			})
			.addCase(getAllAdmins.rejected, (state, action) => {
				state.getAllAdminLoading = false;
				state.getAllAdminError = action.payload.message || action.error.message;
				state.admins = null;
			});
		builder
			.addCase(makeSuperUser.pending, (state) => {
				state.updateAdminLoading = true;
			})
			.addCase(makeSuperUser.fulfilled, (state) => {
				state.updateAdminLoading = false;
				state.updateAdminError = null;
				state.adminUpdated = true;
			})
			.addCase(makeSuperUser.rejected, (state, action) => {
				state.updateAdminLoading = false;
				state.updateAdminError = action.payload.message || action.error.message;
				state.adminUpdated = false;
			});
		builder
			.addCase(createNewAdmin.pending, (state) => {
				state.createAdminLoading = true;
			})
			.addCase(createNewAdmin.fulfilled, (state) => {
				state.createAdminLoading = false;
				state.createAdminError = null;
				state.adminCreated = true;
			})
			.addCase(createNewAdmin.rejected, (state, action) => {
				state.createAdminLoading = false;
				state.createAdminError = action.payload.message || action.error.message;
				state.adminCreated = false;
			});
	},
});

export const selectAdminSlice = (state) => state.admin;
export const selectCurrentAdmin = (state) => state.admin.adminInfo;
export const selectAdmins = (state) => state.admin.admins;

export const { resetCreateAdmin, resetUpdateAdmin } = adminSlice.actions;
export default adminSlice.reducer;
