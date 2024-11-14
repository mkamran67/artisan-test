import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function PageContainer({ children }: Props) {
	return <section className="w-screen h-screen bg-gray-200 dark:bg-zinc-800">{children}</section>;
}
