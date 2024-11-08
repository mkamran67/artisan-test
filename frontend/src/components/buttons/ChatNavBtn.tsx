import React from "react";

type Props = {
	closeHandler: () => void;
	BtnIcon: React.ReactNode;
	extraClasses?: string;
};

export default function ChatNavBtn({ closeHandler, BtnIcon, extraClasses }: Props) {
	return (
		<button
			onClick={closeHandler}
			className={`w-6 h-6 hover:scale-110 transition-transform duration-200 ${extraClasses}`}
		>
			{BtnIcon}
		</button>
	);
}
