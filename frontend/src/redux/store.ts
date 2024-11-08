import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorsReducer";

const store = configureStore({
	reducer: {
		chat: chatReducer,
		user: userReducer,
		errors: errorReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
