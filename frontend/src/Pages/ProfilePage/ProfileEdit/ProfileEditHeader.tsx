import { useState } from "react";
import useSocketContext from "hooks/useSocketContext";
import ProfileImageEditModal from "./ProfileImageEditModal";
import AvatarImage from "./AvatarImage";
import BackgroundImageModal from "./BackgroundImageModal";
import { APP_URL } from "constraints";
import { FaPanorama } from "react-icons/fa6";

const ProfileEditHeader = () => {
  const { userData } = useSocketContext();
  const [profileImageModal, setProfileImageModal] = useState<boolean>(false);
  const [backgroundImageModalOpen, setBackgroundImageModalOpen] =
    useState<boolean>(false);

  return (
    <div className="relative flex flex-col w-full h-fit">
      {userData && userData.backgroundImage ? (
        <div className="w-full h-[257px] flex justify-center items-center  ">
          <img
            className="object-cover w-full h-full"
            src={`${APP_URL}/media/${userData.id}/background/${userData.backgroundImage}`}
            alt="ProfileBackground"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full bg-slate-50 h-[257px]">
          <FaPanorama className="text-7xl" />
        </div>
      )}
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
