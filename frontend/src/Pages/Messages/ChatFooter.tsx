import { useState } from "react";
import MessageInput from "./MessageInput";
import Send from "./Send";

const ChatFooter = () => {
	const [message, setMessage] = useState<string>("");

	return (
		<form
			className="flex flex-col w-full gap-1 mt-auto bg-zinc-100 h-fit"
			onSubmit={(e) => e.preventDefault()}
		>
			<div className="flex items-center w-full h-full px-4 py-4 bg-white">
				<MessageInput message={message} setMessage={setMessage} />
				<Send />
			</div>
		</form>
	);
};

export default ChatFooter;
