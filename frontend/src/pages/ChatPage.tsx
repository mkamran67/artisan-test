import React from "react";
import PageContainer from "../components/containers/PageContainer";
// import Chat from "../components/chatbot/Chat";

type Props = {};

export default function ChatPage({}: Props) {
	return (
		<PageContainer>
			<div className="flex items-center justify-center w-full h-full">
				<p className="p-4 text-2xl text-start">
					Normally I assume the chatbot would be launched from a modal or some button.
				</p>
			</div>
			{/* <Chat /> */}
		</PageContainer>
	);
}
