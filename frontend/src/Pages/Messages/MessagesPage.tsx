import { Outlet } from "react-router-dom";
import MessagesNavBar from "./MessagesNavBar";
import useSocketContext from "hooks/useSocketContext";
import SpinnerLoader from "@components/SpinnerLoader";

const MessagesPage = () => {
	const { conversations, isLoadingConversations, conversationsError } =
		useSocketContext();

	if (isLoadingConversations)
		return (
			<div className="flex justify-center w-full h-full p-5">
				<SpinnerLoader />
			</div>
		);

	if (!isLoadingConversations && conversationsError)
		return (
			<p className="flex justify-center w-full h-full p-5">
				Error occured while loading conversations!
			</p>
		);

	return (
		<div className="flex w-full h-full gap-1 md:px-6">
			<MessagesNavBar conversations={conversations} />
			<Outlet />
		</div>
	);
};
export default MessagesPage;
