import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getUsersLoading: false,
	getUsersError: null,
	users: null,
	userPagination: null,
};

export const getUsers = createAsyncThunk(
	"manageuser/getUsers",
	async (_, { rejectWithValue }) => {
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

const manageUserSlice = createSlice({
	name: "manageuser",
	initialState,
	reducers: {},
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
	},
});

export const selectManageUserSlice = (state) => state.manageuser;
export const selectUsers = (state) => state.manageuser.users;
export default manageUserSlice.reducer;
