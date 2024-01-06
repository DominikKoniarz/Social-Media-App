type Props = {
  setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CancelButton = ({ setAddPostModalOpen }: Props) => {
  return (
    <button
      className="px-5 py-3 text-black capitalize bg-red-500 rounded-md"
      onClick={() => setAddPostModalOpen(false)}
    >
      Cancel
    </button>
  );
};
export default CancelButton;
