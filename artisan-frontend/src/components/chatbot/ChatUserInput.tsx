import React, { useState } from "react";
import GenericAvatar from "../GenericAvatar";
import { useDispatch } from "react-redux";
import { addError, clearError } from "../../redux/errorsReducer";
import { AppDispatch } from "../../redux/store";

type Props = {};

export default function ChatUserInput({}: Props) {
	const dispatch = useDispatch<AppDispatch>();
	const [message, setMessage] = useState("");

	const handleSend = () => {
		try {
			// Send message to backend
			// await axios.post("/api/chatbot", { message });
			// dispatch(addMessage({ message, from: "user" }));
			// setMessage("");
		} catch (err) {
			console.error(err);
			dispatch(
				addError(`Failed to send message ${process.env.NODE_ENV === "development" ? err : ""}`)
			);
			dispatch(clearError());
		}
	};

	return (
		<div className="w-full pt-4 bg-white border-t-[1px] border-gray-200">
			<div className="flex flex-row items-center justify-center w-full p-1">
				<div className="mx-2">
					<GenericAvatar srcPath="/boy.png" />
				</div>
				<input
					type="text"
					placeholder="Your question..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="block w-10/12 overflow-y-auto resize-y rounded-md border-0 ring-0 text-gray-900 text-base dark:text-gray-50 focus:ring-inset focus:ring-1  focus:ring-purple-500 focus:outline-none px-3 py-1.5"
				/>
			</div>
		</div>
	);
}
