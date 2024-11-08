import { useEffect, useState } from "react";
import ChatNavBtn from "../buttons/ChatNavBtn";
import {
	ArrowRightEndOnRectangleIcon,
	ArrowsPointingInIcon,
	ArrowsPointingOutIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { Cog6ToothIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import MessageBox from "./MessageBox";
import ContextDropDown from "./ContextDropDown";
import useWindowSize from "../../hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import GenericAvatar from "../GenericAvatar";
// import ChatUserInput from "./ChatUserInput";
import { addError, clearError } from "../../redux/errorsReducer";
import { sendMessage } from "../../redux/chatReducer";

type Props = {};

export default function Chat({}: Props) {
	const dispatch = useDispatch<AppDispatch>();
	// Collapsed means in modal mode, not small window size.
	const [collapsed, setCollapsed] = useState(true);
	const [supersized, setSupersized] = useState(false);
	const windowSize = useWindowSize();
	const { loading, messages } = useSelector((state: RootState) => state.chat);
	const username = useSelector((state: RootState) => state.user.userName);
	const [message, setMessage] = useState("");

	const handleSend = () => {
		try {
			dispatch(sendMessage(message));
			setMessage("");
		} catch (err) {
			console.error(err);
			dispatch(
				addError(`Failed to send message ${process.env.NODE_ENV === "development" ? err : ""}`)
			);
			dispatch(clearError());
		}
	};

	useEffect(() => {
		// Scroll to bottom of chat messages
		const chatBox = document.querySelector(".flex-grow");
		if (chatBox) {
			chatBox.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<>
			{/* Show modal if collapsed */}
			{collapsed ? (
				<div className="fixed bottom-0 right-0 z-50 mb-6 mr-6 text-white duration-300 ease-in-out transform rounded-full cursor-pointer hover:scale-110 from-purple-500 to-purple-100 bg-gradient-to-br ">
					<div className="rounded-full bg-slate-100">
						<img
							src="/bot.png"
							alt="Chat"
							className="w-20 h-20"
							onClick={() => setCollapsed(false)}
						/>
					</div>
				</div>
			) : (
				// Chat box container
				// By default it's meant for mobile first
				// if supersized is true, it will be expanded mode (bigger chat box)
				// if supersized is false, it will be smaller and it checks the width of the screen for desktop only.
				// On Mobile/small screens supersized will be false by default and no button to expand it.
				<div
					className={`fixed z-50 shadow-md flex flex-col bg-white rounded-2xl ${
						supersized
							? "bottom-5 right-5 md:w-3/4 2xl:w-2/5 md:h-3/4"
							: windowSize.width > 768
							? "bottom-5 right-5 w-[420px] h-[860px]"
							: "w-[95%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					}
				${!collapsed && "duration-300 ease-in-out transition-all"}
					
					`}
				>
					{/* Nav */}
					<div className="flex flex-row items-center justify-between w-full p-4">
						<div>
							{windowSize.width > 768 &&
								(!supersized ? (
									<ChatNavBtn
										actionHandler={() => setSupersized(!supersized)}
										BtnIcon={<ArrowsPointingOutIcon className="fill-gray-600" />}
										extraClasses="mr-2"
									/>
								) : (
									<ChatNavBtn
										actionHandler={() => setSupersized(!supersized)}
										BtnIcon={<ArrowsPointingInIcon className="fill-gray-600" />}
										extraClasses="mr-2"
									/>
								))}
							<ChatNavBtn
								actionHandler={() => setCollapsed(true)}
								BtnIcon={<ArrowRightEndOnRectangleIcon className="fill-gray-600" />}
							/>
						</div>
						<ChatNavBtn
							actionHandler={() => setCollapsed(true)}
							BtnIcon={<XMarkIcon className="w-6 h-6 fill-gray-600" />}
							extraClasses="h-10 w-10 flex items-center justify-center"
						/>
					</div>
					{/* Ava Header and Messages -> This header will scroll up with messages*/}
					<div className="flex flex-col flex-grow w-full overflow-x-hidden overflow-y-scroll bg-white">
						<div className="pt-2" />
						{/* Top Bot header inside chat */}
						<div className="flex flex-col items-center justify-center w-full">
							<GenericAvatar extraClasses="w-20 h-20" />
							<div className="my-4">
								<p className="block text-lg font-semibold text-center">
									Hi {username ? username + "!" : "👋,"} I'm Ava
								</p>
								<p className="block text-sm text-center text-gray-600">
									Ask me anything or pick a place to start
								</p>
							</div>
						</div>
						{/* Chat messages */}
						<MessageBox messages={messages} />
					</div>
					{/* User Input */}
					<div className="w-full pt-4 bg-white border-t-[1px] border-gray-200">
						<div className="flex flex-row items-center justify-center w-full p-1">
							<div className="mx-2">
								<GenericAvatar srcPath="/boy.png" />
							</div>
							<input
								type="text"
								placeholder="Your question..."
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className="block w-10/12 overflow-y-auto resize-y rounded-md border-0 ring-0 text-gray-900 text-base dark:text-gray-50 focus:ring-inset focus:ring-1  focus:ring-purple-500 focus:outline-none px-3 py-1.5"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSend();
									}
								}}
							/>
						</div>
					</div>
					{/* Chat Action buttons bar */}
					<div className="flex flex-row items-center justify-between w-full p-6">
						<div className="flex flex-row items-center justify-center gap-2">
							<p className="text-sm text-gray-500 cursor-default">Context</p>
							<ContextDropDown />
						</div>
						<div className="flex flex-row items-center justify-center gap-2">
							<ChatNavBtn
								actionHandler={() => console.log(`You clicked on settings!`)}
								BtnIcon={<Cog6ToothIcon className="w-6 h-6 text-gray-600" />}
								extraClasses="rounded-full h-10 w-10 hover:shadow-md flex items-center justify-center"
							/>
							<ChatNavBtn
								actionHandler={() => handleSend()}
								BtnIcon={<PaperAirplaneIcon className="w-6 h-6 text-gray-600" />}
								extraClasses="rounded-full h-10 w-10 hover:shadow-md flex items-center justify-center"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
