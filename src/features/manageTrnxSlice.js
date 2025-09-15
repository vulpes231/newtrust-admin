import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getTrnxsLoading: false,
	getTrnxsError: null,
	trnxs: null,
	trnxPagination: null,
};

export const getTrnxs = createAsyncThunk(
	"managetrnx/getTrnxs",
	async (queryData, { rejectWithValue }) => {
		try {
			const response = await api.get("/managetrans");
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

const manageTrnxSlice = createSlice({
	name: "managetrnx",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTrnxs.pending, (state) => {
				state.getTrnxsLoading = true;
			})
			.addCase(getTrnxs.fulfilled, (state, action) => {
				state.getTrnxsLoading = false;
				state.getTrnxsError = null;
				state.trnxs = action.payload.data;
				state.trnxPagination = action.payload.pagination;
			})
			.addCase(getTrnxs.rejected, (state, action) => {
				state.getTrnxsLoading = false;
				state.getTrnxsError = action.payload.message || action.error.message;
				state.trnxs = null;
				state.trnxPagination = null;
			});
	},
});

export const selectManageTrnxSlice = (state) => state.managetrnx;
export const selectTrnxs = (state) => state.managetrnx.trnxs;
export default manageTrnxSlice.reducer;
