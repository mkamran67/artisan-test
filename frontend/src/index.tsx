import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import store from "./redux/store";
import ChatPage from "./pages/ChatPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<App />}
					/>
					<Route
						path="/chatpage"
						element={<ChatPage />}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
