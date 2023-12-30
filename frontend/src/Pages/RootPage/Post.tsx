import imgF from "@assets/images/imgF.png";
import PlaceholderImage from "@assets/images/PlaceholderImage.png";
import {
  FaEllipsis,
  FaEllipsisVertical,
  FaRegHeart,
  FaRegMessage,
  FaRegBookmark,
} from "react-icons/fa6";

const Post = () => {
  return (
    <li className="flex flex-col w-full px-4 py-4 bg-white h-fit">
      <div className="flex items-center gap-1">
        <div className="grid w-12 h-12 p-1 border border-black rounded-full place-items-center">
          <img className="mix-blend-darken" src={imgF} alt="ProfilePicture" />
        </div>
        <p className="ml-2 text-sm font-medium md:text-lg text-zinc-950">
          Placeholder Name
        </p>
        <p className="ml-1 text-xs font-light lowercase md:text-base text-slate-800 font-">
          @AliasDanegoUżytkownika
        </p>
        <p className="text-xs font-light lowercase md:text-base text-slate-800">
          - 10min
        </p>
        <button className="hidden ml-auto mr-2 text-lg md:text-xl md:block">
          <FaEllipsis />
        </button>
        <button className="block ml-auto mr-2 text-lg md:hidden md:text-xl">
          <FaEllipsisVertical />
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
    </li>
  );
};
export default Post;
