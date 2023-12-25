type Props = {
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const UsernameInput = ({ username, setUsername }: Props) => {
	return (
		<>
			<label htmlFor="name-input" className=" hidden absolute left-[-9999px]">
				Name
			</label>
			<input
				required
				className="w-full p-3 my-auto text-base border rounded-lg md:p-6 border-zinc-300 h-fit"
				placeholder="Username"
				id="name-input"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
		</>
	);
};
export default UsernameInput;
