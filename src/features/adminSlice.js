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
	deleteAdminLoading: false,
	deleteAdminError: null,
	adminDeleted: false,
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

export const updateAdminRole = createAsyncThunk(
	"admin/updateAdminRole",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.put(`/manageadmin`, { data: formData });
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
			const response = await api.post(`/register`, formData);
			console.log(response);
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

export const deleteAdmin = createAsyncThunk(
	"admin/deleteAdmin",
	async (formData, { rejectWithValue }) => {
		try {
			console.log(formData);
			const response = await api.delete(`/manageadmin`, { data: formData });
			console.log(response);
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
		resetDeleteAdmin(state) {
			state.deleteAdminLoading = false;
			state.deleteAdminError = null;
			state.adminDeleted = false;
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
			.addCase(updateAdminRole.pending, (state) => {
				state.updateAdminLoading = true;
			})
			.addCase(updateAdminRole.fulfilled, (state) => {
				state.updateAdminLoading = false;
				state.updateAdminError = null;
				state.adminUpdated = true;
			})
			.addCase(updateAdminRole.rejected, (state, action) => {
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
		builder
			.addCase(deleteAdmin.pending, (state) => {
				state.deleteAdminLoading = true;
			})
			.addCase(deleteAdmin.fulfilled, (state) => {
				state.deleteAdminLoading = false;
				state.deleteAdminError = null;
				state.adminDeleted = true;
			})
			.addCase(deleteAdmin.rejected, (state, action) => {
				state.deleteAdminLoading = false;
				state.deleteAdminError = action.payload.message || action.error.message;
				state.adminDeleted = false;
			});
	},
});

export const selectAdminSlice = (state) => state.admin;
export const selectCurrentAdmin = (state) => state.admin.adminInfo;
export const selectAdmins = (state) => state.admin.admins;

export const { resetCreateAdmin, resetUpdateAdmin, resetDeleteAdmin } =
	adminSlice.actions;
export default adminSlice.reducer;
