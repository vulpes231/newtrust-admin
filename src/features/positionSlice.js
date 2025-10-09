import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./interceptors";

const initialState = {
	getPositionsLoading: false,
	getPositionsError: null,
	positions: null,
	tradesPagination: null,
	updatePositionLoading: false,
	updatePositionError: null,
	positionUpdated: false,
	closePositionLoading: false,
	closePositionError: null,
	positionClosed: false,
	createPositionLoading: false,
	createPositionError: null,
	positionCreated: false,
	getPositionInfoLoading: false,
	getPositionInfoError: null,
	positionInfo: null,
};

export const getPositions = createAsyncThunk(
	"position/getPositions",
	async (queryData, { rejectWithValue }) => {
		try {
			const { sortBy, filterBy, page, limit } = queryData;

			const pageLimit = Math.max(1, page || 1);
			const itemLimit = Math.min(10, limit || 10);
			const response = await api.get(
				`/managetrade/?sortBy=${sortBy}&filterBy=${filterBy}&page=${pageLimit}&limit=${itemLimit}`
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

export const createPosition = createAsyncThunk(
	"position/createPosition",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post(`/managetrade`, formData);
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

export const updatePosition = createAsyncThunk(
	"position/updatePosition",
	async (tradeId, { rejectWithValue }) => {
		try {
			const response = await api.put(`/managetrade/${tradeId}`);
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

export const closePosition = createAsyncThunk(
	"position/closePosition",
	async (tradeId, { rejectWithValue }) => {
		try {
			const response = await api.post(`/managetrade/${tradeId}`);
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

export const getPositionInfo = createAsyncThunk(
	"position/getPositionInfo",
	async (tradeId, { rejectWithValue }) => {
		try {
			const response = await api.get(`/managetrade/${tradeId}`);
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

const positionSlice = createSlice({
	name: "position",
	initialState,
	reducers: {
		resetUpdatePosition(state) {
			state.updatePositionLoading = false;
			state.updatePositionError = null;
			state.positionUpdated = false;
		},
		resetClosePosition(state) {
			state.closePositionLoading = false;
			state.closePositionError = null;
			state.positionClosed = false;
		},
		resetCreatePosition(state) {
			state.createPositionLoading = false;
			state.closePositionError = null;
			state.positionCreated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPositions.pending, (state) => {
				state.getPositionsLoading = true;
			})
			.addCase(getPositions.fulfilled, (state, action) => {
				state.getPositionsLoading = false;
				state.getPositionsError = false;
				state.positions = action.payload.data;
				state.tradesPagination = action.payload.pagination;
			})
			.addCase(getPositions.rejected, (state, action) => {
				state.getPositionsLoading = false;
				state.getPositionsError = action.error.payload || action.error.message;
				state.positions = null;
				state.tradesPagination = null;
			});
		builder
			.addCase(updatePosition.pending, (state) => {
				state.updatePositionLoading = true;
			})
			.addCase(updatePosition.fulfilled, (state) => {
				state.updatePositionLoading = false;
				state.updatePositionError = false;
				state.positionUpdated = true;
			})
			.addCase(updatePosition.rejected, (state, action) => {
				state.updatePositionLoading = false;
				state.updatePositionError =
					action.error.payload || action.error.message;
				state.positionUpdated = false;
			});
		builder
			.addCase(closePosition.pending, (state) => {
				state.closePositionLoading = true;
			})
			.addCase(closePosition.fulfilled, (state, action) => {
				state.closePositionLoading = false;
				state.closePositionError = false;
				state.positionClosed = action.payload.data;
			})
			.addCase(closePosition.rejected, (state, action) => {
				state.closePositionLoading = false;
				state.closePositionError = action.error.payload || action.error.message;
				state.positionClosed = null;
			});
		builder
			.addCase(getPositionInfo.pending, (state) => {
				state.getPositionInfoLoading = true;
			})
			.addCase(getPositionInfo.fulfilled, (state, action) => {
				state.getPositionInfoLoading = false;
				state.getPositionInfoError = false;
				state.positionInfo = action.payload.data;
			})
			.addCase(getPositionInfo.rejected, (state, action) => {
				state.getPositionInfoLoading = false;
				state.getPositionInfoError =
					action.error.payload || action.error.message;
				state.positionInfo = null;
			});
		builder
			.addCase(createPosition.pending, (state) => {
				state.createPositionLoading = true;
			})
			.addCase(createPosition.fulfilled, (state, action) => {
				state.createPositionLoading = false;
				state.createPositionError = false;
				state.positionCreated = true;
			})
			.addCase(createPosition.rejected, (state, action) => {
				state.createPositionLoading = false;
				state.createPositionError =
					action.error.payload || action.error.message;
				state.positionCreated = false;
			});
	},
});

export const selectPositionSlice = (state) => state.position;
export const selectAllPositions = (state) => state.position.positions;
export const selectCurrentPositionInfo = (state) => state.position.positionInfo;

export const { resetClosePosition, resetUpdatePosition, resetCreatePosition } =
	positionSlice.actions;
export default positionSlice.reducer;
