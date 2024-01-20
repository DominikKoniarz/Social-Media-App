import { Navigate, useParams } from "react-router-dom";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import useSocketContext from "hooks/useSocketContext";
import { useEffect, useRef } from "react";

type Params = {
	conversationId?: string;
};

const Chat = () => {
	const { conversations } = useSocketContext();
	const { conversationId } = useParams<Params>();
	const messagesListBottomRef = useRef<HTMLLIElement>(null);

	const foundConversation = conversations.find(
		(conversation) => conversation.id === conversationId
	);

	useEffect(() => {
		messagesListBottomRef.current?.scrollIntoView({
			behavior: "instant",
		});
	});

	if (!foundConversation) return <Navigate to="/messages" replace={true} />;

	return (
		<div className="relative flex flex-col w-full">
			<ChatHeader
				conversations={conversations}
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
				messagesListBottomRef={messagesListBottomRef}
			/>
			<ChatFooter conversationId={foundConversation.id} />
		</div>
	);
};
export default Chat;
