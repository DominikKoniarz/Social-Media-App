import imgF from "../../assets/imgF.png";
import PlaceholderImage from "../../assets/PlaceholderImage.png";
import {
  FaEllipsis,
  FaRegHeart,
  FaRegMessage,
  FaRegBookmark,
} from "react-icons/fa6";
const Post = () => {
  return (
    <li className="flex flex-col w-full px-3 pt-3 bg-white h-fit">
      <div className="flex items-center gap-1">
        <div className="p-1 py-1 border border-white rounded-full ">
          <img className="mix-blend-darken" src={imgF} alt="ProfilePicture" />
        </div>
        <p className="text-lg font-medium text-zinc-950">Placeholder Name</p>
        <p className="text-base font-light lowercase text-slate-800">
          @AliasDanegoUżytkownika
        </p>
        <p className="text-base font-light lowercase text-slate-800">- 10min</p>
        <button className="ml-20 ">
          <FaEllipsis />
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
