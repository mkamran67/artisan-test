import React from "react";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function MessageBox() {
	const messages = useSelector((state: RootState) => state.chat.messages);

	return (
		<div className="flex flex-col w-full gap-3">
			{messages.map((message) => (
				<SingleMessage
					key={message.id}
					isBot={message.isBot}
					message={message.content}
					avatar={message.isBot ? "/bot.png" : "/boy.png"}
				/>
			))}
		</div>
	);
}
