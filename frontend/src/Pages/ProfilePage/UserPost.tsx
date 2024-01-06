import imgF from "@assets/images/imgF.png";
import PlaceholderImage from "@assets/images/PlaceholderImage.png";
import useSocketContext from "hooks/useSocketContext";
import {
  FaRegTrashCan,
  FaRegHeart,
  FaRegMessage,
  FaRegBookmark,
} from "react-icons/fa6";
import Loader from "./ProfileEdit/Loader";
import { APP_URL } from "constraints";

const UserPost = () => {
  const { userData } = useSocketContext();
  return (
    <li className="flex flex-col w-full px-4 py-4 bg-white h-fit">
      {userData ? (
        <>
          <div className="flex items-center gap-1">
            <div className="grid w-12 h-12 border-2 border-black rounded-full place-items-center">
              {userData && userData.avatarImage ? (
                <img
                  className="w-full h-full rounded-full "
                  src={`${APP_URL}/media/${userData.id}/avatar/${userData.avatarImage}`}
                  alt="ProfilePicture"
                />
              ) : (
                <img
                  className="mix-blend-darken"
                  src={imgF}
                  alt="ProfilePicture"
                />
              )}
            </div>
            {userData.firstname && userData.lastname && (
              <p className="ml-2 text-lg font-medium text-zinc-950">
                {`${userData.firstname} ${userData.lastname}`}
              </p>
            )}
            <p className="ml-1 text-base font-light lowercase text-slate-800 font-family1">
              @{userData.username}
            </p>
            <p className="text-base font-light lowercase text-slate-800">
              - 10min
            </p>
            <button className="ml-auto mr-2 text-2xl">
              <FaRegTrashCan />
            </button>
          </div>
          <div className="flex flex-col ">
            <p className="py-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </p>
            <img
              className="mix-blend-darken"
              src={PlaceholderImage}
              alt="ProfilePicture"
            />
          </div>
          <div className="flex items-center w-full h-full gap-8 py-5 ">
            <div className="flex items-center gap-2 text-base font-normal lowercase text-slate-600">
              <FaRegHeart className="text-lg" /> 123
            </div>
            <div className="flex items-center gap-2 text-base font-normal lowercase text-slate-600">
              <FaRegMessage className="text-lg" /> 3123
            </div>
            <div className="flex items-center gap-2 text-base font-normal lowercase text-slate-600">
              <FaRegBookmark className="text-lg" /> 3123
            </div>
          </div>
        </>
      ) : (
        <div className="pb-16">
          <Loader />
        </div>
      )}
    </li>
  );
};
export default UserPost;
