type Props = {
	websiteURL: string;
	setWebsiteURL: React.Dispatch<React.SetStateAction<string>>;
};

const WebsiteURLInput = ({ websiteURL, setWebsiteURL }: Props) => {
	return (
		<div className="flex flex-col w-full">
			<p className="py-1">WebsiteURL</p>
			<label
				htmlFor="WebsiteURL-input"
				className=" hidden absolute left-[-9999px]"
			>
				WebsiteURL
			</label>
			<input
				className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
				type="text"
				placeholder="WebsiteURL"
				id="WebsiteURL-input"
				value={websiteURL}
				onChange={(e) => setWebsiteURL(e.target.value)}
			/>
		</div>
	);
};
export default WebsiteURLInput;
