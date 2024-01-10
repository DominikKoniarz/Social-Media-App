import { useState } from "react";
import useSocketContext from "hooks/useSocketContext";
import ProfileImageEditModal from "./ProfileImageEditModal";
import AvatarImage from "./AvatarImage";
import BackgroundImageModal from "./BackgroundImageModal";
import { FaPanorama } from "react-icons/fa6";
import BackgroundDeleteModal from "./BackgroundDeleteModal";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";

const ProfileEditHeader = () => {
	const { generateBackgroundImageSrc } = useGenerateImageSrc();
	const { userData } = useSocketContext();
	const [profileImageModal, setProfileImageModal] = useState<boolean>(false);
	const [backgroundImageModalOpen, setBackgroundImageModalOpen] =
		useState<boolean>(false);
	const [backgroundImageDeleteModalOpen, setBackgroundImageDeleteModalOpen] =
		useState<boolean>(false);

	return (
		<div className="relative flex flex-col w-full h-fit">
			{userData && userData.backgroundImage ? (
				<div className="w-full h-[257px] flex justify-center items-center  ">
					<img
						className="object-cover w-full h-full"
						src={generateBackgroundImageSrc(
							userData.id,
							userData.backgroundImage
						)}
						alt="ProfileBackground"
					/>
				</div>
			) : (
				<div className="flex items-center justify-center w-full bg-slate-600 h-[257px]">
					<FaPanorama className="text-white text-7xl" />
				</div>
			)}
			<div className="absolute flex flex-row gap-4 right-6 top-6">
				<button
					onClick={() => setBackgroundImageModalOpen(true)}
					type="button"
					className="px-3 py-2 text-base font-normal capitalize bg-white text-zinc-950 font-family1"
				>
					Change Image
				</button>
				{userData && userData.backgroundImage && (
					<button
						onClick={() => setBackgroundImageDeleteModalOpen(true)}
						type="button"
						className="px-3 py-2 text-base font-normal text-white capitalize bg-red-500 font-family1"
					>
						Delete image
					</button>
				)}
			</div>
			<BackgroundImageModal
				backgroundImageModalOpen={backgroundImageModalOpen}
				setBackgroundImageModalOpen={setBackgroundImageModalOpen}
			/>
			<AvatarImage setProfileImageModal={setProfileImageModal} />
			<ProfileImageEditModal
				profileImageModal={profileImageModal}
				setProfileImageModal={setProfileImageModal}
			/>
			<BackgroundDeleteModal
				backgroundImageDeleteModalOpen={backgroundImageDeleteModalOpen}
				setBackgroundImageDeleteModalOpen={setBackgroundImageDeleteModalOpen}
			/>
		</div>
	);
};
export default ProfileEditHeader;
