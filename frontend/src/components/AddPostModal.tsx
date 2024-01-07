import { Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";
import { useCallback, useState } from "react";
import { FileRejection } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./AddPostComponents/Header";
import TextArea from "./AddPostComponents/TextArea";
import PostImage from "./AddPostComponents/PostImage";
import ImageIcon from "./AddPostComponents/ImageIcon";
import Calendar from "./AddPostComponents/Calendar";
import PublishItButton from "./AddPostComponents/PublishItButton";
import CancelButton from "./AddPostComponents/CancelButton";

type Props = {
	addPostModalOpen: boolean;
	setAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPostModal = ({ addPostModalOpen, setAddPostModalOpen }: Props) => {
	const { socket } = useSocketContext();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageBase64, setImageBase64] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string | null>(null);
	const [releaseDate, setReleaseDate] = useState<Date | null>(new Date());
	const [textContent, setTextContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			setError(null);

			if (fileRejections.length > 0) {
				setError(fileRejections[0].errors[0].message);
				return;
			}

			const file = acceptedFiles[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				setImageFile(file);
				setImageBase64(reader.result as string);
				setImageName(file.name);
			};
		},
		[]
	);

	const handleAddPost = async (callback: () => void) => {
		if (!socket || !textContent) return;

		setError(null);

		const imageBuffer = imageFile ? await imageFile.arrayBuffer() : null;
		const publishDate = releaseDate ? new Date() : null;

		socket.emit(
			"addPost",
			textContent,
			imageBuffer,
			imageName,
			publishDate,
			(error) => {
				if (error) return setError(error);

				callback();
			}
		);
	};

	return (
		<Modal
			size={"6xl"}
			show={addPostModalOpen}
			onClose={() => setAddPostModalOpen(false)}
		>
			<Modal.Header className="bg-white rounded-none ">
				<Header />
			</Modal.Header>
			<Modal.Body className="bg-white ">
				<div className="flex flex-col justify-center w-full gap-2 ">
					<TextArea textContent={textContent} setTextContent={setTextContent} />
					{imageBase64 ? (
						<PostImage imageBase64={imageBase64} />
					) : (
						<p className="px-0">Add your favourite pictures!</p>
					)}
					<hr />
					<div className="flex items-center h-8 gap-2 text-2xl text-black/50">
						<ImageIcon onDrop={onDrop} />
						<Calendar
							releaseDate={releaseDate}
							setReleaseDate={setReleaseDate}
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer className="flex flex-col items-start space-x-0 bg-white rounded-none">
				<div className="flex items-center gap-4">
					<PublishItButton
						handleAddPost={() =>
							handleAddPost(() => {
								setImageFile(null);
								setImageBase64(null);
								setImageName(null);
								setTextContent(null);
								setReleaseDate(null);
								setError(null);

								setAddPostModalOpen(false);
							})
						}
					/>
					<CancelButton setAddPostModalOpen={setAddPostModalOpen} />
				</div>
				{error && (
					<p className="mt-3 font-semibold text-red-500 w-fit">{error}</p>
				)}
			</Modal.Footer>
		</Modal>
	);
};
export default AddPostModal;
