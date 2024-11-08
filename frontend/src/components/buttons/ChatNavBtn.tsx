import React from "react";

type Props = {
	actionHandler: () => void;
	BtnIcon: React.ReactNode;
	extraClasses?: string;
	loading?: boolean;
};

export default function ChatNavBtn({ actionHandler, loading, BtnIcon, extraClasses }: Props) {
	return (
		<button
			disabled={loading}
			onClick={actionHandler}
			className={`w-6 h-6 hover:scale-110 transition-transform duration-200 ${extraClasses} ${
				loading ? "animate-spin" : ""
			}`}
		>
			{BtnIcon}
		</button>
	);
}
