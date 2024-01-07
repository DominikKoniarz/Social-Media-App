type Props = {
	setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPostButton = ({ setAddPostModalOpen }: Props) => {
	return (
		<button
			onClick={() => setAddPostModalOpen(true)}
			type="submit"
			className="px-4 py-2 text-white bg-teal-500 rounded-md shadow w-fit"
		>
			Publish Post
		</button>
	);
};
export default AddPostButton;
