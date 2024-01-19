import { useState } from "react";
import toast from "react-hot-toast";
import useSocketContext from "./useSocketContext";

const useSendMessage = () => {
	const { socket, setConversations } = useSocketContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const sendMessage = (
		message: string,
		conversationId: string,
		cb: () => void
	) => {
		if (!socket || isLoading || message.trim().length === 0) return;

		setIsLoading(true);

		socket.emit("sendMessage", conversationId, message, (error, newMessage) => {
			setIsLoading(false);

			if (error) {
				import.meta.env.DEV && console.log(error);
				toast(error);
				return;
			}

			if (!error && newMessage) {
				setConversations((prevConversations) => {
					return prevConversations.map((conversation) => {
						if (conversation.id === conversationId) {
							return {
								...conversation,
								messages: [...conversation.messages, newMessage],
							};
						}

						return conversation;
					});
				});
				cb();
			}
		});
	};

	return { sendMessage, isLoading };
};

export default useSendMessage;
