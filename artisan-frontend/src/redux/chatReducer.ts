import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { original } from "@reduxjs/toolkit";

export interface Message {
	content: string;
	user_id: number;
	timestamp?: number;
	id: number;
	isBot: boolean;
}

interface InitialStateType {
	messages: Array<Message>;
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

			return data as SendMessageResponse[];
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

export const sendDeleteMessageRequest = createAsyncThunk(
	"message/delete",
	async (messageId: number, { getState, rejectWithValue }) => {
		try {
			const { user } = getState() as RootState;
			const backendURL: string = process.env.REACT_APP_API_BASE_URL || "";
			const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
			if (!user.id && !userFromStorage.id) {
				return rejectWithValue("No User ID");
			}

			const payload = {
				messageId: messageId,
				user_id: user.id || userFromStorage.id,
			};

			const response = await axios.delete(
				`${backendURL}/chat/messages/${payload.user_id}/${payload.messageId}`
			);

			return { wasDeleted: response.status === 204, messageId };
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

type EditMessageRequest = {
	messageContent: string;
	messageId: number;
};

export const editMessageRequest = createAsyncThunk(
	"message/edit",
	async ({ messageContent, messageId }: EditMessageRequest, { getState, rejectWithValue }) => {
		try {
			const { user } = getState() as RootState;
			const backendURL: string = process.env.REACT_APP_API_BASE_URL || "";
			const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
			if (!user.id && !userFromStorage.id) {
				return rejectWithValue("No User ID");
			}

			const payload = {
				id: messageId,
				user_id: user.id || userFromStorage.id,
				content: messageContent,
			};

			const { data } = await axios.put(`${backendURL}/chat/message`, payload);

			return data as SendMessageResponse;
		} catch (error: any) {
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
				const [userMessage, botMessage] = payload as SendMessageResponse[];

				const originalStateMessages = original(state.messages) as Array<Message>;
				// .findLastIndex() is used to find the last message sent by the user
				// REVIEW -> .findLastIndex() is a TS bug for ES2022 or ESNext
				// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex#browser_compatibility
				// @ts-ignore
				const userMessageIndex = originalStateMessages.findLastIndex(
					(message: Message) => message.content === userMessage.content
				);

				// Update the message with the ID from the server
				if (userMessageIndex !== -1) {
					state.messages[userMessageIndex].id = userMessage.id;
				}

				// Add bot response
				state.messages.push({
					content: botMessage.content,
					user_id: botMessage.user_id,
					isBot: botMessage.is_bot,
					id: botMessage.id,
				});

				state.messages.push();
			})
			.addCase(sendMessage.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendMessage.rejected, (state, { payload }) => {
				state.messages.push({
					content: "Sorry, I am not able to respond right now. Please try again later.",
					user_id: state.messages[0].user_id,
					isBot: true,
					id: 999,
				});
				state.loading = false;
			})
			.addCase(sendDeleteMessageRequest.fulfilled, (state, { payload }) => {
				if (payload.wasDeleted) {
					state.messages = state.messages.filter((msg) => msg.id !== payload.messageId);
				}
			})
			.addCase(sendDeleteMessageRequest.rejected, (state, { payload }) => {
				console.log("Error deleting message", payload);
			})
			.addCase(sendDeleteMessageRequest.pending, (state) => {
				console.log("Deleting message");
			})
			.addCase(editMessageRequest.fulfilled, (state, { payload }) => {
				const updatedMessage = payload;
				const originalStateMessages = original(state.messages) as Array<Message>;

				// @ts-ignore -> TS bug for ES2022 or ESNext, see above Line #152
				const updatedMessageIndex = originalStateMessages.findLastIndex(
					(message: Message) => message.id === updatedMessage.id
				);

				if (updatedMessageIndex !== -1) {
					state.messages[updatedMessageIndex].content = updatedMessage.content;
				}

				//  throw error if message not found
			})
			.addCase(editMessageRequest.rejected, (state, { payload }) => {
				console.log("Error editing message");
			})
			.addCase(editMessageRequest.pending, (state) => {
				console.log("Editing message");
			});
	},
});

export const { addMessage, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;
