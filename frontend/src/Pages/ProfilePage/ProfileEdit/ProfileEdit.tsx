import ProfileBackground from "@assets/images/ProfileBackground.png";
import ProfilePicture from "@assets/images/ProfilePicture.png";
import { FaPen } from "react-icons/fa6";

const ProfileEdit = () => {
  return (
    <main className="w-full h-full px-6">
      <div className="relative flex flex-col w-full h-fit">
        <img src={ProfileBackground} alt="ProfileBackground" />
        <button className="absolute p-3 text-lg font-normal capitalize bg-white right-6 top-6 text-zinc-950 family1">
          Change Image
        </button>

        <button className="absolute rounded-md left-10 top-56">
          <div className="relative w-full h-full">
            <div className="absolute flex items-center justify-center w-full h-full text-xl transition-colors duration-200 rounded-md opacity-0 hover:opacity-50 hover:bg-slate-500">
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
    </main>
  );
};
export default ProfileEdit;
