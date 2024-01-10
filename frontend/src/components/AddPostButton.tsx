import { FaRegSquarePlus } from "react-icons/fa6";

type Props = {
  setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPostButton = ({ setAddPostModalOpen }: Props) => {
  return (
    <button
      onClick={() => setAddPostModalOpen(true)}
      type="submit"
      className="absolute px-3 py-2 text-white bg-teal-500 rounded-md shadow md:px-4 md:py-2 right-4 w-fit"
    >
      <p className="hidden md:block">Publish Post</p>
      <p className="items-center justify-center block text-3xl md:hidden">
        <FaRegSquarePlus />
      </p>
    </button>
  );
};
export default AddPostButton;
