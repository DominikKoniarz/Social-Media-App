type Props = {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const MessageInput = ({ message, setMessage }: Props) => {
	return (
		<input
			placeholder="Write your messages here!"
			type="text"
			className="w-full focus:border-none focus:outline-none text-zinc-900 text-sm font-medium font-family2 leading-[18px] pr-4"
			value={message}
			onChange={(e) => setMessage(e.target.value)}
		/>
	);
};
export default MessageInput;
