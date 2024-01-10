import { FaPen, FaTrashCan, FaRegUser } from "react-icons/fa6";
import useSocketContext from "hooks/useSocketContext";
import { useState } from "react";
import AvatarDeleteModal from "./AvatarDeleteModal";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";

type Props = {
	setProfileImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AvatarImage = ({ setProfileImageModal }: Props) => {
	const [deleteImageModalOpen, setDeleteImageModalOpen] =
		useState<boolean>(false);
	const { userData } = useSocketContext();
	const { generateAvatarImageSrc } = useGenerateImageSrc();

	return (
		<div className="absolute grid place-items-center bottom-0 translate-y-1/2 left-10 w-[128px] h-[118px] rounded-md bg-slate-50 border-slate-200 border-2 overflow-hidden group">
			{userData && userData.avatarImage ? (
				<img
					className="absolute z-10 object-cover w-full h-full"
					src={generateAvatarImageSrc(userData.id, userData.avatarImage)}
					alt="ProfilePicture"
				/>
			) : (
				<FaRegUser className="text-3xl" />
			)}
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="relative z-20 w-full h-full transition-all duration-300 bg-black bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50">
					<div className="absolute flex items-center justify-center w-full h-full gap-4 text-2xl">
						<button
							className="z-20 text-white w-fit h-fit"
							onClick={() => setProfileImageModal(true)}
						>
							<FaPen />
						</button>
						{userData && userData.avatarImage && (
							<>
								<button
									className="z-20 text-red-500 w-fit h-fit"
									onClick={() => setDeleteImageModalOpen(true)}
								>
									<FaTrashCan />
								</button>
								<AvatarDeleteModal
									setDeleteImageModalOpen={setDeleteImageModalOpen}
									deleteImageModalOpen={deleteImageModalOpen}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default AvatarImage;
