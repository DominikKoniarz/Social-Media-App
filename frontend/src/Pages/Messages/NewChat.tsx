import { Navigate, useLocation, useParams } from "react-router-dom";
import useSocketContext from "hooks/useSocketContext";
import ChatHeader from "./ChatHeader";
import NewChatBody from "./NewChatBody";
import NewChatFooter from "./NewChatFooter";
import { UserData } from "../../../../types/socket.io";

type Params = {
	userId?: string;
};

const NewChat = () => {
	const { conversations } = useSocketContext();
	const { userId } = useParams<Params>();
	const { state } = useLocation();

	if (!state) return <Navigate to={`/messages`} replace={true} />;

	const userData = state?.userData as UserData;

	const foundConversation = conversations.find(
		(conversation) => conversation.otherUserId === userId
	);

	if (foundConversation)
		return <Navigate to={`/messages/${foundConversation.id}`} replace={true} />;

	return (
		<div className="relative flex flex-col w-full">
			<ChatHeader
				userId={userData.id}
				avatar={userData.avatarImage}
				username={userData.username}
				firstname={userData.firstname}
				lastname={userData.lastname}
			/>
			<NewChatBody />
			<NewChatFooter otherUserId={userData.id} />
		</div>
	);
};
export default NewChat;
