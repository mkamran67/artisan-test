import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialStateType {
	userName: string;
	id: number | null;
	loading: boolean;
}

const initialState: InitialStateType = {
	userName: "",
	id: null,
	loading: false,
};

interface ThunkParams {
	name: string;
}

interface CreateUserResponseData {
	name: string;
	id: number;
	created_at: string;
	messages: []; // Ignored in this case since history is not needed in a random chat bot
}

export const createUser = createAsyncThunk(
	"chat/user",
	async ({ name }: ThunkParams, { rejectWithValue }) => {
		try {
			const backendURL: string = process.env.REACT_APP_API_BASE_URL || "";
			const response = await axios.post(`${backendURL}/chat/user`, {
				name,
			});
			// save user and id to local storage -> due to dev refreshes and no backend auth
			// Normally you'd use a token or session cookie if it's account based
			// Or phone number / email address to keep track of user -> continue where they left off in chat on disconnect
			localStorage.setItem("user", JSON.stringify(response.data));
			return response.data as CreateUserResponseData;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		updateUserName: (state, action) => {
			state.userName = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.fulfilled, (state, { payload }) => {
				state.userName = payload.name;
				state.id = payload.id;
				state.loading = false;
			})
			.addCase(createUser.rejected, (state, action) => {
				console.error(action.error);
				state.loading = false;
			})
			.addCase(createUser.pending, (state) => {
				state.loading = true;
			});
	},
});

export const { updateUserName } = chatSlice.actions;
export default chatSlice.reducer;
