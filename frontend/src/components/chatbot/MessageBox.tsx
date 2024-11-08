import SingleMessage from "./SingleMessage";
import { Message } from "../../redux/chatReducer";
import { useEffect, useRef } from "react";

type Props = {
	messages: Message[];
};

export default function MessageBox({ messages }: Props) {
	const messagesEndRef = useRef<HTMLDivElement>(null);

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
