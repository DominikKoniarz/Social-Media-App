import { FaPen } from "react-icons/fa6";
import ProfileBackground from "@assets/images/ProfileBackground.png";
import ProfilePicture from "@assets/images/ProfilePicture.png";
import { useState } from "react";
import ProfileImageEditModal from "./ProfileImageEditModal";

const ProfileEditHeader = () => {
	const [profileImageModal, setProfileImageModal] = useState<boolean>(false);

	return (
		<div className="relative flex flex-col w-full h-fit">
			<img src={ProfileBackground} alt="ProfileBackground" />
			<button
				type="button"
				className="absolute p-3 text-lg font-normal capitalize bg-white right-6 top-6 text-zinc-950 font-family1"
			>
				Change Image
			</button>

			<button
				className="absolute bottom-0 block translate-y-1/2 rounded-md left-10"
				onClick={() => setProfileImageModal(true)}
			>
				<div className="relative w-full h-full">
					<div className="absolute flex items-center justify-center w-full h-full text-xl text-white transition-all duration-300 rounded-md opacity-0 hover:opacity-50 hover:bg-black">
						<FaPen />
					</div>
					<img
						className="w-full h-full rounded-md"
						src={ProfilePicture}
						alt="ProfilePicture"
					/>
				</div>
			</button>
			<ProfileImageEditModal
				profileImageModal={profileImageModal}
				setProfileImageModal={setProfileImageModal}
			/>
		</div>
	);
};
export default ProfileEditHeader;
