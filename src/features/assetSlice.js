import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getAssetsLoading: false,
	getAssetsError: null,
	assets: null,
};

export const getAllAssets = createAsyncThunk(
	"asset/getAllAssets",
	async (queryData, { rejectWithValue }) => {
		try {
			const { sortBy, filterBy, filterValue, page, limit } = queryData;
			const response = await api.get(
				`/asset/?filterBy=${filterBy}&sortBy=${sortBy}&limit=${limit}&page=${page}&filterValue=${filterValue}`
			);
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

const assetSlice = createSlice({
	name: "asset",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllAssets.pending, (state) => {
				state.getAssetsLoading = true;
			})
			.addCase(getAllAssets.fulfilled, (state, action) => {
				state.getAssetsLoading = false;
				state.getAssetsError = null;
				state.assets = action.payload.data;
			})
			.addCase(getAllAssets.rejected, (state, action) => {
				state.getAssetsLoading = false;
				state.getAssetsError = action.error.payload || action.error.message;
				state.assets = null;
			});
	},
});

export const selectAssetsSlice = (state) => state.asset;
export const selectAssets = (state) => state.asset.assets;

export default assetSlice.reducer;
