type Props = {
	textContent: string | null;
	setTextContent: React.Dispatch<React.SetStateAction<string | null>>;
};

const TextArea = ({ textContent, setTextContent }: Props) => {
	return (
		<>
			<p className="text-lg">What are you thinking about?</p>
			<hr />
			<textarea
				value={textContent || ""}
				onChange={(e) => setTextContent(e.target.value)}
				placeholder="Write what you want here!"
				className="w-full h-24 p-0 text-base leading-relaxed text-black border border-none rounded-md resize-none border-slate-700 max-h-48 focus:outline-none"
			></textarea>
			<hr />
		</>
	);
};
export default TextArea;
