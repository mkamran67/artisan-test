import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface InitialStateType {
	message: string;
	level: "error" | "warning" | "info";
}

export const clearError = createAsyncThunk(
	"error/clean", // A unique action type
	async () => {
		const response: InitialStateType = await new Promise((resolve) =>
			setTimeout(() => resolve({ message: "", level: "error" }), 3000)
		);
		return response;
	}
);

const initialState: InitialStateType = {
	message: "",
	level: "error",
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addError: (state, { payload }) => {
			state.message = payload.message;
			state.level = payload.level;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearError.fulfilled, (state, { payload }) => {
			state.message = payload.message;
			state.level = payload.level;
		});
	},
});

export const { addError } = chatSlice.actions;
export default chatSlice.reducer;
