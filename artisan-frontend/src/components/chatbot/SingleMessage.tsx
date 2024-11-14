import React, { useState } from "react";
import Dropdown from "./MessageMenu";

type Props = {
	message: string;
	isBot: boolean;
	avatar: string;
	messageId: number;
	deleteMessage?: () => void;
	editMessage?: (update: string) => void;
};

export default function SingleMessage({
	message,
	isBot,
	avatar,
	deleteMessage,
	editMessage,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(message);
	const [submitable, setSubmitable] = useState(false);

	const updateMessage = () => {
		if (editText.length > 0 && editText !== message && editMessage) {
			setIsEditing(false);
			editMessage(editText);
		}
	};

	const editTextChangeHangler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditText(e.target.value);
		setSubmitable(e.target.value.length > 0 && e.target.value !== message);
	};

	return isBot ? (
		<div className="flex flex-row justify-start flex-grow w-full gap-2 min-h-12">
			<img
				src={avatar}
				alt={isBot ? "bot avatar" : "user avatar"}
				className="w-10 h-10 mb-8 ml-2 rounded-full"
			/>
			<div className="p-2 mt-4 mr-4 rounded-tl-none bg-gray-50 h-fit rounded-3xl min-h-12">
				<p className="flex-grow p-1 text-black break-words text-start"> {message}</p>
			</div>
		</div>
	) : (
		<div className="flex flex-row items-start justify-end w-full pr-2 h-fit min-h-12">
			{isEditing ? (
				<>
					<div className="flex flex-col items-center justify-center flex-grow p-2 mt-4 ml-8 mr-3 bg-purple-500 rounded-tr-none rounded-3xl">
						<textarea
							value={editText}
							onChange={editTextChangeHangler}
							className="flex-grow w-full p-3 my-2 text-black rounded-lg text-wrap text-start"
						/>
						<div className="flex flex-row gap-1 my-2">
							<button
								onClick={() => setIsEditing(false)}
								className={`p-2 bg-purple-500 text-gray-200 rounded-lg mr-3 hover:text-white hover:bg-purple-400 px-3`}
							>
								<p>Cancel</p>
							</button>

							<button
								disabled={!submitable}
								onClick={updateMessage}
								className={`px-3 text-white rounded-lg ${
									submitable ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-400"
								}`}
							>
								<p>Update</p>
							</button>
						</div>
					</div>
					<img
						src={avatar}
						alt={isBot ? "bot avatar" : "user avatar"}
						className="w-10 h-10 rounded-full bg-gray-50"
					/>
				</>
			) : (
				<>
					<div className="flex flex-row items-center justify-center p-2 mt-4 ml-8 mr-3 bg-purple-500 rounded-tr-none rounded-3xl">
						<Dropdown
							deleteButton={() => deleteMessage && deleteMessage()}
							editButton={() => setIsEditing(true)}
						/>
						<p className="flex-grow block p-1 text-white break-words text-start"> {message}</p>
					</div>
					<img
						src={avatar}
						alt={isBot ? "bot avatar" : "user avatar"}
						className="w-10 h-10 rounded-full bg-gray-50"
					/>
				</>
			)}
		</div>
	);
}
