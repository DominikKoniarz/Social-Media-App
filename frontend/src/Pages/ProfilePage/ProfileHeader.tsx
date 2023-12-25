import ProfileBackground from "@assets/images/ProfileBackground.png";
import ProfilePicture from "@assets/images/ProfilePicture.png";
import { FaPen, FaShareNodes } from "react-icons/fa6";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col w-full h-fit">
      <img src={ProfileBackground} alt="ProfileBackground" />
      <div className="absolute mt-32 ml-10">
        <img
          className="border-0 border-white rounded-md"
          src={ProfilePicture}
          alt="ProfilePicture"
        />
      </div>
      <div className="flex items-center justify-end gap-4 px-4 pt-6 ">
        <button className="w-[42px] h-[42px]  flex justify-center items-center rounded-full border border-teal-500">
          <FaPen />
        </button>
        <button className="w-[42px] h-[42px] flex justify-center items-center rounded-full border border-teal-500">
          <FaShareNodes />
        </button>
      </div>
    </div>
  );
};
export default ProfileHeader;
