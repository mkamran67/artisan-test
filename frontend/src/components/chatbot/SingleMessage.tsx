import React from "react";

type Props = {
	message: string;
	isBot: boolean;
	avatar: string;
	actionable?: boolean;
	action?: "delete" | "edit";
	actionHandler?: () => void;
};

export default function SingleMessage({
	message,
	isBot,
	avatar,
	actionable,
	action,
	actionHandler,
}: Props) {
	return isBot ? (
		<div className="flex flex-row justify-start flex-grow w-full gap-2 min-h-12">
			<img
				src={avatar}
				alt={isBot ? "bot avatar" : "user avatar"}
				className="w-10 h-10 mb-8 ml-2 rounded-full"
			/>
			<div className="p-2 mt-4 rounded-tl-none bg-gray-50 h-fit rounded-3xl min-h-12">
				<p className="flex-grow p-1 text-black break-words text-start"> {message}</p>
			</div>
		</div>
	) : (
		<div className="flex flex-row items-start justify-end w-full pr-2 h-fit min-h-12">
			<div className="p-2 mt-4 mr-3 bg-purple-500 rounded-tr-none rounded-3xl">
				<p className="flex-grow block p-1 text-white break-words text-start"> {message}</p>
			</div>
			<img
				src={avatar}
				alt={isBot ? "bot avatar" : "user avatar"}
				className="w-10 h-10 rounded-full bg-gray-50"
			/>
		</div>
	);
}
