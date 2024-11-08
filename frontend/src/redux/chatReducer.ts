import { createSlice } from "@reduxjs/toolkit";

interface Message {
	text: string;
}

interface InitialStateType {
	messages: Message[];
	userInput: string;
}

const initialState: InitialStateType = {
	messages: [],
	userInput: "",
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			state.messages.push(payload);
		},
		updateUserInput: (state, action) => {
			state.userInput = action.payload;
		},
		deleteMessage: (state, { payload }) => {
			state.messages = state.messages.filter((msg, index) => index !== payload);
		},
	},
});

export const { addMessage, updateUserInput, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;
