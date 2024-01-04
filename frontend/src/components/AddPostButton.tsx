type Props = {
  setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPostButton = ({ setAddPostModalOpen }: Props) => {
  return (
    <button
      onClick={() => setAddPostModalOpen(true)}
      type="submit"
      className="px-3 py-3 bg-teal-500 rounded-md shadow w-fit"
    >
      Publish Post
    </button>
  );
};
export default AddPostButton;
