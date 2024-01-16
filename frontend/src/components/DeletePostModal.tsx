import { Button, Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";
import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  postDeleteModalOpen: boolean;
  setPostDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const DeletePostModal = ({
  id,
  postDeleteModalOpen,
  setPostDeleteModalOpen,
}: Props) => {
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const [error, setError] = useState<string | null>(null);
  const handleDeletePost = (callback: () => void) => {
    if (!socket) return;

    socket.emit("deletePost", id, (error) => {
      if (error) {
        setError(error);
        return;
      }
      callback();
    });
  };

  return (
    <Modal
      show={postDeleteModalOpen}
      size="md"
      onClose={() => setPostDeleteModalOpen(false)}
      popup
    >
      <Modal.Header className="bg-white rounded-t-xl" />
      <Modal.Body className="bg-white rounded-b-xl">
        <div className="text-center bg-white">
          <FaCircleExclamation className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete your post?
          </h3>
          <div className="flex justify-center gap-4 ">
            <Button
              color="failure"
              onClick={() => {
                handleDeletePost(() => {
                  setPostDeleteModalOpen(false);
                  navigate(0);
                });
              }}
            >
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setPostDeleteModalOpen(false)}>
              No, cancel
            </Button>
          </div>
          {error && <p className="mt-3 font-semibold text-red-600">{error}</p>}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default DeletePostModal;
