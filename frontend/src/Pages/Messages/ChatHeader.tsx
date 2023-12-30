import { Avatar } from "flowbite-react";
import { FaEllipsis } from "react-icons/fa6";
const ChatHeader = () => {
  return (
    <div className="relative flex items-center w-full gap-2 px-6 py-4 mb-4 bg-white">
      <Avatar img="" rounded size="md" />
      <div className="flex flex-col">
        <p className="text-xl font-bold text-zinc-900 font-family2">
          Domino Koniarz
        </p>
        <div className="flex items-center gap-1">
          <div className="p-[3px] bg-green-600 border border-green-600 rounded-full"></div>
          <p className="text-neutral-600 text-base font-normal font-family2 leading-[18px]">
            Active now
          </p>
        </div>
      </div>
      <button className="absolute flex items-center justify-center p-3 text-2xl text-gray-400 border rounded-full right-6">
        <FaEllipsis />
      </button>
    </div>
  );
};
export default ChatHeader;
