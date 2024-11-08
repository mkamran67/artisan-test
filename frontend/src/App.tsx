import React, { useState } from "react";
import PageContainer from "./components/containers/PageContainer";
import CardContainer from "./components/containers/CardContainer";
import DottedLoader from "./components/loader/DottedLoader";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "./redux/userReducer";
import { useNavigate } from "react-router-dom";
import { addError, clearError } from "./redux/errorsReducer";
import { AppDispatch, RootState } from "./redux/store";

function App() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	// Generally speaking this would be top level to show on page, or specific component UI error elements.
	const { message, level } = useSelector((state: RootState) => state.errors);

	const startTalking = async () => {
		try {
			setLoading(true);

			if (name.length <= 2) {
				dispatch(addError({ message: "Name should be more than 2 characters", level: "error" }));
				dispatch(clearError());
			} else {
				dispatch(updateUserName(name));
				// Ping backend to simulate bot availability
				// const
				// const data = await response.json();
				navigate("/chatpage");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageContainer>
			<div className="flex flex-col items-center justify-center w-full h-full">
				{message && (
					<div
						className={`${
							level === "error"
								? "bg-red-500"
								: level === "warning"
								? "bg-yellow-500"
								: "bg-green-500"
						} text-white w-[95%] md:w-2/5 top-0 fixed mx-auto mt-5 p-3 rounded-md`}
					>
						{message}
					</div>
				)}
				<CardContainer>
					<header className="w-full pb-6 pt-14">
						<h1 className="text-3xl font-extrabold text-center">Lets Start Talking!</h1>
					</header>
					<main className="flex-col items-center justify-center flex-1 w-full mt-8">
						<form className="flex-col items-center justify-center w-3/4 mx-auto">
							<label className="block font-medium text-gray-900 text-base/7 text-start">Name</label>
							<div className="mt-1">
								<input
									className="block w-full rounded-md border-0 text-gray-900 text-xl dark:text-gray-50 shadow-sm ring-gray-300 ring-2 focus:ring-inset focus:ring-purple-500 focus:outline-none px-3 py-1.5"
									autoComplete="name"
									value={name}
									onChange={(e) =>
										setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
									}
								/>
							</div>
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									startTalking();
								}}
								className="flex items-center justify-center w-full py-3 mt-5 font-semibold text-white bg-purple-600 rounded-md shadow-md outline-offset-2 focus-visible:outline dark:text-black dark:bg-purple-800/80 group-btn focus:outline-purple-600 hover:bg-opacity-80"
							>
								{loading ? (
									<DottedLoader />
								) : (
									<p className="text-lg font-semibold text-center">Start Talking</p>
								)}
							</button>
						</form>
					</main>
				</CardContainer>
			</div>
		</PageContainer>
	);
}

export default App;
