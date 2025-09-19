import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getUsersLoading: false,
	getUsersError: null,
	users: null,
	userPagination: null,
	addUserLoading: false,
	addUserError: null,
	userAdded: false,
	getCurrentUserLoading: false,
	getCurrentUserError: null,
	currentUser: null,
	editUserLoading: false,
	editUserError: null,
	userEdited: false,
	removeUserLoading: false,
	removeUserError: null,
	userRemoved: false,
};

export const getUsers = createAsyncThunk(
	"manageuser/getUsers",
	async (queryData, { rejectWithValue }) => {
		try {
			const response = await api.get("/manageuser");
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

export const createUser = createAsyncThunk(
	"manageuser/createUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/manageuser", formData);
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

export const getUserInfo = createAsyncThunk(
	"manageuser/getUserInfo",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await api.get(`/manageuser/${userId}`);
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

export const updateUser = createAsyncThunk(
	"manageuser/updateUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.put("/manageuser", { data: formData });
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

export const deleteUser = createAsyncThunk(
	"manageuser/deleteUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.delete("/manageuser", { data: formData });
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

const manageUserSlice = createSlice({
	name: "manageuser",
	initialState,
	reducers: {
		resetEditUser(state) {
			state.editUserLoading = false;
			state.editUserError = null;
			state.userEdited = false;
		},
		resetAddUser(state) {
			state.addUserLoading = false;
			state.addUserError = null;
			state.userAdded = false;
		},
		resetRemoveUser(state) {
			state.removeUserLoading = false;
			state.removeUserError = null;
			state.userRemoved = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.getUsersLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.getUsersLoading = false;
				state.getUsersError = null;
				state.users = action.payload.data;
				state.userPagination = action.payload.pagination;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.getUsersLoading = false;
				state.getUsersError = action.payload.message || action.error.message;
				state.users = null;
				state.userPagination = null;
			});
		builder
			.addCase(getUserInfo.pending, (state) => {
				state.getCurrentUserLoading = true;
			})
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.getCurrentUserLoading = false;
				state.getCurrentUserError = null;
				state.currentUser = action.payload.data;
			})
			.addCase(getUserInfo.rejected, (state, action) => {
				state.getCurrentUserLoading = false;
				state.getCurrentUserError =
					action.payload.message || action.error.message;
				state.currentUser = null;
			});
		builder
			.addCase(updateUser.pending, (state) => {
				state.editUserLoading = true;
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.editUserLoading = false;
				state.editUserError = null;
				state.userEdited = true;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.editUserLoading = false;
				state.editUserError = action.payload.message || action.error.message;
				state.userEdited = false;
			});
		builder
			.addCase(createUser.pending, (state) => {
				state.addUserLoading = true;
			})
			.addCase(createUser.fulfilled, (state) => {
				state.addUserLoading = false;
				state.addUserError = null;
				state.userAdded = true;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.addUserLoading = false;
				state.addUserError = action.payload.message || action.error.message;
				state.userAdded = false;
			});
		builder
			.addCase(deleteUser.pending, (state) => {
				state.removeUserLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.removeUserLoading = false;
				state.removeUserError = null;
				state.userRemoved = true;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.removeUserLoading = false;
				state.removeUserError = action.payload.message || action.error.message;
				state.userRemoved = false;
			});
	},
});

export const selectManageUserSlice = (state) => state.manageuser;
export const selectUsers = (state) => state.manageuser.users;
export const selectCurrentUser = (state) => state.manageuser.currentUser;

export const { resetAddUser, resetEditUser, resetRemoveUser } =
	manageUserSlice.actions;
export default manageUserSlice.reducer;
