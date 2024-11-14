import SingleMessage from "./SingleMessage";
import { editMessageRequest, Message, sendDeleteMessageRequest } from "../../redux/chatReducer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type Props = {
	messages: Message[];
};

export default function MessageBox({ messages }: Props) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch<AppDispatch>();

	// only delete user messages
	const deleteMessage = (id: number) => {
		dispatch(sendDeleteMessageRequest(id));
	};

	const editMessageHandler = (id: number, content: string) => {
		// Dispatch edit thunk
		dispatch(editMessageRequest({ messageContent: content, messageId: id }));
	};

	const editMessage = (id: number) => (contentUpdate: string) => {
		editMessageHandler(id, contentUpdate);
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="flex flex-col w-full gap-6">
			{messages.length > 0 ? (
				<>
					{messages.map((message, index) => (
						<SingleMessage
							key={message.id + `${message.isBot ? "bot" : "user"} + ${index}`}
							isBot={message.isBot}
							message={message.content}
							avatar={message.isBot ? "/bot.png" : "/boy.png"}
							messageId={message.id}
							deleteMessage={!message.isBot ? () => deleteMessage(message.id) : undefined}
							editMessage={!message.isBot ? editMessage(message.id) : undefined}
						/>
					))}
					<div
						ref={messagesEndRef}
						className="pt-2"
					/>
				</>
			) : (
				<div className="flex flex-col items-center justify-center flex-grow">
					<h1 className="block text-center text-gray-400">No messages yet</h1>
				</div>
			)}
		</div>
	);
}
