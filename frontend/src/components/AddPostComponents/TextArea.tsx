type Props = {
	textContent: string | null;
	setTextContent: React.Dispatch<React.SetStateAction<string | null>>;
};

const TextArea = ({ textContent, setTextContent }: Props) => {
	return (
		<>
			<textarea
				value={textContent || ""}
				onChange={(e) => setTextContent(e.target.value)}
				placeholder="What are you thinking about?"
				className="w-full h-24 p-0 text-base leading-relaxed text-black border border-none rounded-md resize-none border-slate-700 max-h-48 focus:outline-none"
			></textarea>
			<hr />
		</>
	);
};
export default TextArea;
