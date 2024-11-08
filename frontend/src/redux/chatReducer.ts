import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { addError, clearError } from "./errorsReducer";

export interface Message {
	content: string;
	user_id: string;
	timestamp?: number;
	id?: number;
	isBot: boolean;
}

interface InitialStateType {
	messages: Message[];
	loading: boolean;
}

const initialState: InitialStateType = {
	messages: [],
	loading: false,
};

interface SendMessageRequest {
	content: string;
	user_id: number;
}

interface SendMessageResponse {
	content: string;
	user_id: number;
	is_bot: boolean;
	id: number;
	created_at: string;
}

export const sendMessage = createAsyncThunk(
	"message/send",
	async (message: string, { getState, rejectWithValue, dispatch }) => {
		try {
			const { user } = getState() as RootState;
			const backendURL: string = process.env.REACT_APP_API_BASE_URL || "";
			const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
			if (!user.id && !userFromStorage.id) {
				return rejectWithValue("No User ID");
			}

			const payload: SendMessageRequest = {
				content: message,
				user_id: user.id || userFromStorage.id,
			};

			// Save Message to local state
			dispatch(addMessage({ content: message, user_id: payload.user_id.toString(), isBot: false }));

			const { data } = await axios.post(`${backendURL}/chat/message/new`, payload);

			return data as SendMessageResponse;
		} catch (error: any) {
			// OPtional way to add errors to the UI (not implemented in this example)
			// if (error.message) {
			// 	dispatch(
			// 		addError({
			// 			message: error.message,
			// 			level: "error",
			// 		})
			// 	);
			// 	dispatch(clearError());
			// }
			return rejectWithValue(error);
		}
	}
);

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			state.messages.push(payload);
		},
		deleteMessage: (state, { payload }) => {
			state.messages = state.messages.filter((msg, index) => index !== payload);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(sendMessage.fulfilled, (state, { payload }) => {
				state.messages.push({
					content: payload.content,
					user_id: payload.user_id.toString(),
					isBot: true,
				});
			})
			.addCase(sendMessage.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendMessage.rejected, (state, { payload }) => {
				console.error(payload);
				state.messages.push({
					content: "Sorry, I am not able to respond right now. Please try again later.",
					user_id: "bot",
					isBot: true,
				});
				state.loading = false;
			});
	},
});

export const { addMessage, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;
