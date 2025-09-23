import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getTrnxsLoading: false,
	getTrnxsError: null,
	trnxs: null,
	trnxPagination: null,
	createTrnxLoading: false,
	createTrnxError: null,
	trnxCreated: null,
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

export const createTrnx = createAsyncThunk(
	"manageuser/createTrnx",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/managetrans", formData);
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
	reducers: {
		resetAddTrnx(state) {
			state.createTrnxLoading = false;
			state.createTrnxError = null;
			state.trnxCreated = false;
		},
	},
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

		builder
			.addCase(createTrnx.pending, (state) => {
				state.createTrnxLoading = true;
			})
			.addCase(createTrnx.fulfilled, (state) => {
				state.createTrnxLoading = false;
				state.createTrnxError = null;
				state.trnxCreated = true;
			})
			.addCase(createTrnx.rejected, (state, action) => {
				state.createTrnxLoading = false;
				state.createTrnxError = action.payload.message || action.error.message;
				state.trnxCreated = null;
			});
	},
});

export const selectManageTrnxSlice = (state) => state.managetrnx;
export const selectTrnxs = (state) => state.managetrnx.trnxs;

export const { resetAddTrnx } = manageTrnxSlice.actions;
export default manageTrnxSlice.reducer;
