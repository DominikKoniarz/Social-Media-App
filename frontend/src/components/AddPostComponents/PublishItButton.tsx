type Props = {
	handleAddPost: () => void;
};

const PublishItButton = ({ handleAddPost }: Props) => {
	return (
		<button
			className="px-5 py-3 text-white capitalize bg-teal-500 rounded-md"
			onClick={handleAddPost}
		>
			Publish it!
		</button>
	);
};
export default PublishItButton;
