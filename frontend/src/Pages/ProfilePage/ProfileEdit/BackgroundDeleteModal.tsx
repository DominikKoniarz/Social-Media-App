import { Button, Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";
import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

type Props = {
	backgroundImageDeleteModalOpen: boolean;
	setBackgroundImageDeleteModalOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
};

const BackgroundDeleteModal = ({
	backgroundImageDeleteModalOpen,
	setBackgroundImageDeleteModalOpen,
}: Props) => {
	const [error, setError] = useState<string | null>(null);
	const { socket, setUserData } = useSocketContext();

	const handleDeleteAvatar = (callback: () => void) => {
		if (!socket) return;

		socket.emit("deleteBackgroundImage", (error) => {
			if (error) {
				setError(error);
				return;
			}

			setUserData((prev) => {
				if (!prev) return null;

				return { ...prev, backgroundImage: null };
			});
			callback();
		});
	};

	return (
		<Modal
			show={backgroundImageDeleteModalOpen}
			size="md"
			onClose={() => setBackgroundImageDeleteModalOpen(false)}
			popup
		>
			<Modal.Header className="bg-white rounded-t-xl" />
			<Modal.Body className="bg-white rounded-b-xl">
				<div className="text-center bg-white">
					<FaCircleExclamation className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Are you sure you want to delete your background picture?
					</h3>
					<div className="flex justify-center gap-4 ">
						<Button
							color="failure"
							onClick={() => {
								handleDeleteAvatar(() =>
									setBackgroundImageDeleteModalOpen(false)
								);
							}}
						>
							Yes, I'm sure
						</Button>
						<Button
							color="gray"
							onClick={() => setBackgroundImageDeleteModalOpen(false)}
						>
							No, cancel
						</Button>
					</div>
					{error && <p className="mt-3 font-semibold text-red-600">{error}</p>}
				</div>
			</Modal.Body>
		</Modal>
	);
};
export default BackgroundDeleteModal;
