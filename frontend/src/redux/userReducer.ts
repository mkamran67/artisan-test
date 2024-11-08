import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
	userName: string;
}

const initialState: InitialStateType = {
	userName: "",
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		updateUserName: (state, action) => {
			state.userName = action.payload;
		},
	},
});

export const { updateUserName } = chatSlice.actions;
export default chatSlice.reducer;
