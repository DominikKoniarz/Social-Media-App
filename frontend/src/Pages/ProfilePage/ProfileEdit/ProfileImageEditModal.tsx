import { Modal } from "flowbite-react";
import useSocketContext from "hooks/useSocketContext";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Cropper from "./Cropper";

type Props = {
	profileImageModal: boolean;
	setProfileImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileImageEditModal = ({
	profileImageModal,
	setProfileImageModal,
}: Props) => {
	const { socket, setUserData } = useSocketContext();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageBase64, setImageBase64] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string | null>(null);
	const [cropData, setCropData] = useState<Cropper.Data>();
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

	const handleSaveAvatarImage = async (callback: () => void) => {
		if (!socket || !imageFile || !cropData || !imageName) return;

		setError(null);

		const imageBuffer = await imageFile.arrayBuffer();

		socket.emit(
			"saveAvatarImage",
			imageBuffer,
			imageName,
			cropData,
			(error, newImageSrc) => {
				if (error) return setError(error);

				setUserData((prev) => {
					if (!prev) return null;

					return { ...prev, avatarImage: newImageSrc };
				});

				callback();
			}
		);
	};

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".webp"],
		},
		maxFiles: 1,
		maxSize: 6291456 /* 6MB */,
	});

	return (
		<Modal show={profileImageModal} onClose={() => setProfileImageModal(false)}>
			<h1 className="p-6 text-lg font-bold text-black bg-white border-b border-b-black">
				Add or change profile image
			</h1>
			<div className="flex flex-col h-full bg-white">
				{imageBase64 && <Cropper src={imageBase64} setCropData={setCropData} />}
				<div
					className="p-6 focus:outline-none focus:border-none hover:cursor-pointer"
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					{imageBase64 ? (
						<>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									open();
								}}
								className="px-4 py-2 text-sm text-white capitalize bg-teal-500 rounded-md"
							>
								Change image
							</button>
						</>
					) : (
						<p className="py-5">Click here or drag an image!</p>
					)}
				</div>
			</div>
			<div className="p-6 pb-5 bg-white border-t border-t-black">
				<div className="flex flex-row gap-6">
					<button
						disabled={!imageFile || !cropData || !imageName}
						onClick={() => {
							handleSaveAvatarImage(() => {
								setProfileImageModal(false);
								setImageFile(null);
								setImageBase64(null);
								setImageName(null);
							});
						}}
						className="px-5 py-3 text-white capitalize bg-teal-500 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
					>
						Save
					</button>
					<button
						color="gray"
						onClick={() => {
							setProfileImageModal(false);
							setImageFile(null);
							setImageBase64(null);
							setImageName(null);
						}}
						className="px-5 py-3 text-white capitalize bg-red-500 rounded-md"
					>
						Cancel
					</button>
				</div>
				<p className="mt-3 font-semibold text-red-600">{error}</p>
			</div>
		</Modal>
	);
};

export default ProfileImageEditModal;
