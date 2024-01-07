type Props = {
	handleAddPost: () => void;
	disabled: boolean;
};

const PublishItButton = ({ handleAddPost, disabled }: Props) => {
	return (
		<button
			disabled={disabled}
			className="px-5 py-3 text-white capitalize bg-teal-500 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
			onClick={handleAddPost}
		>
			Publish it!
		</button>
	);
};
export default PublishItButton;
