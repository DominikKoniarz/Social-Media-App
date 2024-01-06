type Props = {
  handleAddPost: (callback: () => void) => Promise<void>;
  setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PublishItButton = ({ handleAddPost, setAddPostModalOpen }: Props) => {
  return (
    <button
      className="px-5 py-3 text-black capitalize bg-teal-500 rounded-md"
      onClick={() => handleAddPost(() => setAddPostModalOpen(false))}
    >
      Publish it!
    </button>
  );
};
export default PublishItButton;
