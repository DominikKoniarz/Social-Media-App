import { Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";

type Props = {
	addPostModalOpen: boolean;
	setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPostModal = ({ addPostModalOpen, setAddPostModalOpen }: Props) => {
	const { userData } = useSocketContext();

	return (
		<Modal
			size={"6xl"}
			show={addPostModalOpen}
			onClose={() => setAddPostModalOpen(false)}
		>
			<Modal.Header className="bg-white rounded-none ">
				<span className="flex justify-center text-lg font-medium text-black md:text-xl">
					Add your post here {userData?.firstname ? userData.firstname : ""}
				</span>
			</Modal.Header>
			<Modal.Body className="bg-white ">
				<div className="flex flex-col justify-center w-full gap-2 ">
					<p className="text-lg">What are you thinking about?</p>
					<textarea
						placeholder="Write what you want here!"
						className="w-full h-24 p-2 text-base leading-relaxed text-black border rounded-md border-slate-700 max-h-48 "
					></textarea>
					<p className="text-base leading-relaxed text-white dark:text-gray-400"></p>
				</div>
			</Modal.Body>
			<Modal.Footer className="bg-white rounded-none">
				<div className="flex items-center gap-4">
					<button
						className="px-5 py-3 text-black capitalize bg-green-500 rounded-md"
						onClick={() => setAddPostModalOpen(false)}
					>
						Publish it!
					</button>
					<button
						className="px-5 py-3 text-black capitalize bg-red-500 rounded-md"
						onClick={() => setAddPostModalOpen(false)}
					>
						Cancel
					</button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};
export default AddPostModal;
