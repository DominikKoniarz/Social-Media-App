import ProfileBackground from "@assets/images/ProfileBackground.png";
import { useState } from "react";
import ProfileImageEditModal from "./ProfileImageEditModal";
import AvatarImage from "./AvatarImage";
import BackgroundImageModal from "./BackgroundImageModal";

const ProfileEditHeader = () => {
  const [profileImageModal, setProfileImageModal] = useState<boolean>(false);
  const [backgroundImageModalOpen, setBackgroundImageModalOpen] =
    useState<boolean>(false);

  return (
    <div className="relative flex flex-col w-full h-fit">
      <img src={ProfileBackground} alt="ProfileBackground" />
      <button
        onClick={() => setBackgroundImageModalOpen(true)}
        type="button"
        className="absolute p-3 text-lg font-normal capitalize bg-white right-6 top-6 text-zinc-950 font-family1"
      >
        Change Image
      </button>
      <BackgroundImageModal
        backgroundImageModalOpen={backgroundImageModalOpen}
        setBackgroundImageModalOpen={setBackgroundImageModalOpen}
      />
      <AvatarImage setProfileImageModal={setProfileImageModal} />
      <ProfileImageEditModal
        profileImageModal={profileImageModal}
        setProfileImageModal={setProfileImageModal}
      />
    </div>
  );
};
export default ProfileEditHeader;
