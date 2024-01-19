import { useState } from "react";
import MessageInput from "./MessageInput";
import Send from "./Send";
import useSendMessage from "hooks/useSendMessage";

type Props = {
	conversationId: string;
};

const ChatFooter = ({ conversationId }: Props) => {
	const { sendMessage, isLoading } = useSendMessage();
	const [message, setMessage] = useState<string>("");

	return (
		<form
			className="flex flex-col w-full gap-1 mt-auto bg-zinc-100 h-fit"
			onSubmit={(e) => {
				e.preventDefault();
				sendMessage(message, conversationId, () => setMessage(""));
			}}
		>
			<div className="flex items-center w-full h-full px-4 py-4 bg-white">
				<MessageInput message={message} setMessage={setMessage} />
				<Send isLoading={isLoading} />
			</div>
		</form>
	);
};

export default ChatFooter;
