import {
  FaRegTrashCan,
  FaRegHeart,
  FaRegMessage,
  FaRegBookmark,
  FaRegUser,
} from "react-icons/fa6";
import useCalculateElapsedTime from "hooks/useCalculateElapsedTime";
import { UserData } from "../../../types/socket.io";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";
import DeletePostModal from "./DeletePostModal";
import { useState } from "react";

type Props = {
  id: string;
  textContent: string;
  image: string | null;
  publishedAt: Date;
  userData: UserData;
};

const UserPost = ({ id, textContent, image, publishedAt, userData }: Props) => {
  const elapsedTimeString = useCalculateElapsedTime(publishedAt);
  const { generatePostImageSrc, generateAvatarImageSrc } =
    useGenerateImageSrc();

  const [postDeleteModalOpen, setPostDeleteModalOpen] =
    useState<boolean>(false);

  return (
    <li className="flex flex-col w-full px-4 py-4 bg-white h-fit">
      <div className="flex items-center w-full gap-1">
        <div className="grid w-12 h-12 border-2 border-black rounded-full place-items-center shrink-0">
          {userData && userData.avatarImage ? (
            <img
              className="object-cover w-full h-full rounded-full"
              src={generateAvatarImageSrc(userData.id, userData.avatarImage)}
              alt="ProfilePicture"
            />
          ) : (
            <FaRegUser className="text-lg" />
          )}
        </div>
        {userData.firstname && userData.lastname && (
          <p className="ml-2 text-base font-medium leading-6 xl:text-lg text-zinc-950">
            {`${userData.firstname} ${userData.lastname}`}
          </p>
        )}
        <div className="flex flex-row items-start mr-1 shrink-0 gap-x-2 w-fit">
          <p className="ml-1 text-base font-light lowercase w-fit text-slate-800 font-family1">
            @{userData.username}
          </p>
          <p className="text-base font-light text-right lowercase w-fit text-slate-800">
            - {elapsedTimeString}
          </p>
        </div>
        <button
          onClick={() => setPostDeleteModalOpen(true)}
          type="button"
          className="ml-auto mr-2 text-2xl"
        >
          <FaRegTrashCan />
        </button>
        <DeletePostModal
          id={id}
          postDeleteModalOpen={postDeleteModalOpen}
          setPostDeleteModalOpen={setPostDeleteModalOpen}
        />
      </div>
      <div className="flex flex-col">
        <p className={`${!image ? "pt-4 pb-0" : "pt-2 pb-2"}`}>{textContent}</p>
        {image && (
          <img
            className="mix-blend-darken max-h-[300px] object-contain w-full h-full"
            src={generatePostImageSrc(userData.id, id, image)}
            alt="Post image"
          />
        )}
      </div>
      <div className="flex items-center w-full h-full gap-8 py-5">
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
    </li>
  );
};
export default UserPost;
