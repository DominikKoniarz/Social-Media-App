import { Navigate, useParams } from "react-router-dom";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import useSocketContext from "hooks/useSocketContext";

type Params = {
	conversationId?: string;
};

const Chat = () => {
	const { conversations } = useSocketContext();
	const { conversationId } = useParams<Params>();

	const foundConversation = conversations.find(
		(conversation) => conversation.id === conversationId
	);

	if (!foundConversation) return <Navigate to="/messages" replace={true} />;

	return (
		<div className="relative flex flex-col w-full">
			<ChatHeader
				userId={foundConversation.otherUserId}
				avatar={foundConversation.otherUserAvatarImage}
				firstname={foundConversation.otherUserFirstname}
				lastname={foundConversation.otherUserLastname}
				username={foundConversation.otherUserUsername}
			/>
			<ChatBody
				messages={foundConversation.messages}
				otherUserId={foundConversation.otherUserId}
				otherUserAvatar={foundConversation.otherUserAvatarImage}
			/>
			<ChatFooter />
		</div>
	);
};
export default Chat;
