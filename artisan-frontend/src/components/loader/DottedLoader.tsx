import React from "react";

export default function DottedLoader() {
	return (
		<div className="flex flex-row justify-center">
			<p className="text-center font-semibold text-lg mr-1">Loading</p>
			<p className="text-xl text-center text-white mr-1 animate-bounce-one">.</p>
			<p className="text-xl text-center text-white mr-1 animate-bounce-two">.</p>
			<p className="text-xl text-center text-white mr-1 animate-bounce-one">.</p>
		</div>
	);
}
