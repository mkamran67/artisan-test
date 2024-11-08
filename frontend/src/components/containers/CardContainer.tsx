import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function CardContainer({ children }: Props) {
	return (
		<main className="h-[420px] w-[95%]  md:w-[420px] rounded-lg shadow-lg border-t border-gray-400/10 flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-700">
			{children}
		</main>
	);
}
