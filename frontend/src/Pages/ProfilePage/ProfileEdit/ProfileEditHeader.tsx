import { FaPen } from "react-icons/fa6";
import ProfileBackground from "@assets/images/ProfileBackground.png";
import ProfilePicture from "@assets/images/ProfilePicture.png";

const ProfileEditHeader = () => {
  return (
    <div className="relative flex flex-col w-full h-fit">
      <img src={ProfileBackground} alt="ProfileBackground" />
      <button
        type="button"
        className="absolute p-3 text-lg font-normal capitalize bg-white right-6 top-6 text-zinc-950 family1"
      >
        Change Image
      </button>

      <button className="absolute rounded-md left-10 top-56">
        <div className="relative w-full h-full">
          <div className="absolute flex items-center justify-center w-full h-full text-xl text-white transition-all duration-300 rounded-md opacity-0 hover:opacity-50 hover:bg-black">
            <FaPen />
          </div>
          <img
            className="w-full h-full rounded-md asbolute"
            src={ProfilePicture}
            alt="ProfilePicture"
          />
        </div>
      </button>
    </div>
  );
};
export default ProfileEditHeader;