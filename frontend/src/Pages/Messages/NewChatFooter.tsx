import { useState } from "react";
import MessageInput from "./MessageInput";
import Send from "./Send";
import useCreateNewConversation from "hooks/useCreateNewConversation";

type Props = {
	otherUserId: string;
};

const NewChatFooter = ({ otherUserId }: Props) => {
	const [message, setMessage] = useState<string>("");

	const { createNewConversation, isLoading } = useCreateNewConversation();

	return (
		<form
			className="flex flex-col w-full gap-1 mt-auto bg-zinc-100 h-fit"
			onSubmit={(e) => {
				e.preventDefault();
				createNewConversation(otherUserId, message);
			}}
		>
			<div className="flex items-center w-full h-full px-4 py-4 bg-white">
				<MessageInput message={message} setMessage={setMessage} />
				{message.trim().length > 0 && <Send isLoading={isLoading} />}
			</div>
		</form>
	);
};

export default NewChatFooter;
