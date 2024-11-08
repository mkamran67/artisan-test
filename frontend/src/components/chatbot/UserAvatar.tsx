import React from "react";

type Props = {
	srcPath?: string;
};

export default function UserAvatar({ srcPath = "bot.png" }: Props) {
	return (
		<img
			src={srcPath}
			alt="User avatar"
			className="w-10 h-10 border border-purple-100 rounded-full"
		/>
	);
}
