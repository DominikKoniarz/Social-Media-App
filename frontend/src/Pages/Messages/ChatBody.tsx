import { UserMessage } from "../../../../types/socket.io";
import OtherUserMessage from "./OtherUserMessage";
import YourMessage from "./YourMessage";

type Props = {
	messages: UserMessage[];
	otherUserId: string;
	otherUserAvatar: string | null;
	messagesListBottomRef: React.RefObject<HTMLLIElement>;
};

const ChatBody = ({
	messages,
	otherUserId,
	otherUserAvatar,
	messagesListBottomRef,
}: Props) => {
	return (
		<ul className="relative w-full px-4 mb-2 overflow-y-auto chat h-fit">
			{messages
				.sort(
					(a, b) =>
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				)
				.map((message, index) => {
					if (message.senderId === otherUserId) {
						return (
							<OtherUserMessage
								newestMessage={index === messages.length - 1}
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
								newestMessage={index === messages.length - 1}
								key={message.id}
								textContent={message.textContent}
								createdAt={message.createdAt}
							/>
						);
					}
				})}
			<li
				ref={messagesListBottomRef}
				className="w-full h-0 bg-transparent"
				aria-hidden
			></li>
		</ul>
	);
};

export default ChatBody;
