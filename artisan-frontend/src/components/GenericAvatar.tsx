import React from "react";

type Props = {
	srcPath?: string;
	extraClasses?: string;
};

export default function GenericAvatar({ srcPath = "bot.png", extraClasses }: Props) {
	return (
		<img
			src={srcPath}
			alt="User avatar"
			className={`w-10 h-10 border border-purple-100 rounded-full ${extraClasses}`}
		/>
	);
}
