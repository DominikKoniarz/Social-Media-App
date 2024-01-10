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
    <li className="flex flex-col w-full px-1 py-4 bg-white md:p-4 h-fit">
      <div className="flex items-center gap-1">
        <div className="grid w-10 p-0.5 border md:shrink-0 border-black rounded-full h-10 md:h-12 md:w-12 place-items-center">
          <img className="mix-blend-darken" src={imgF} alt="ProfilePicture" />
        </div>
        <p className="text-sm font-medium text-left md:ml-2 md:text-left md:text-lg text-zinc-950 font-family1">
          Placeholder Name
        </p>
        <div className="flex flex-col items-end gap-1 md:flex-row">
          <p className="ml-1 text-xs font-light lowercase md:text-base text-slate-800 font-family1">
            @AliasDanegoUżytkownika
          </p>
          <p className="text-xs font-light lowercase md:text-base text-slate-800 font-family1">
            - 10min
          </p>
        </div>
        <button className="hidden ml-auto mr-2 text-lg md:text-xl md:block">
          <FaEllipsis />
        </button>
        <button className="block ml-auto mr-0 text-lg md:mr-2 md:hidden md:text-xl">
          <FaEllipsisVertical />
        </button>
      </div>
      <div className="flex flex-col ">
        <p className="py-2 text-sm md:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </p>
        <img
          className="mix-blend-darken h-[300px] object-cover w-full max-w-[630px]"
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
