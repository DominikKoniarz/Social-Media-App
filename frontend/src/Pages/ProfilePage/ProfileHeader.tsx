import { APP_URL } from "constraints";
import useSocketContext from "hooks/useSocketContext";
import { FaPanorama, FaPen, FaRegUser, FaShareNodes } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const { userData } = useSocketContext();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/profileEdit");
  };

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
      <div className="absolute grid place-items-center border-2 bottom-[7px] border-slate-200 rounded-md overflow-hidden left-10 h-[118px] w-[128px] bg-slate-50">
        {userData && userData.avatarImage ? (
          <img
            className="absolute object-cover w-full h-full"
            src={`${APP_URL}/media/${userData.id}/avatar/${userData.avatarImage}`}
            alt="ProfilePicture"
          />
        ) : (
          <FaRegUser className="text-3xl" />
        )}
      </div>
      <div className="flex items-center justify-end gap-4 px-4 pt-6 ">
        <button
          className="w-[42px] h-[42px] flex justify-center items-center rounded-full border border-teal-500"
          onClick={handleEditClick}
        >
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
