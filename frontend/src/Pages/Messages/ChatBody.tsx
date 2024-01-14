import { UserMessage } from "../../../../types/socket.io";
import OtherUserMessage from "./OtherUserMessage";
import YourMessage from "./YourMessage";

type Props = {
	messages: UserMessage[];
	otherUserId: string;
	otherUserAvatar: string | null;
};

const ChatBody = ({ messages, otherUserId, otherUserAvatar }: Props) => {
	return (
		<ul className="relative w-full px-4 mb-2 space-y-10 overflow-y-auto chat h-fit">
			{messages.map((message) => {
				if (message.senderId === otherUserId) {
					return (
						<OtherUserMessage
							key={message.id}
							userId={message.senderId}
							avatar={otherUserAvatar}
							textContent={message.textContent}
							createdAt={message.createdAt}
						/>
					);
				} else {
					return (
						<YourMessage
							key={message.id}
							textContent={message.textContent}
							createdAt={message.createdAt}
						/>
					);
				}
			})}
		</ul>
	);
};

export default ChatBody;
