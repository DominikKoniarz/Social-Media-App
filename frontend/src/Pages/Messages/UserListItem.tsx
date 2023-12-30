import { Avatar } from "flowbite-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
const UserListItem = () => {
  return (
    <>
      <li>
        <Link
          to="#"
          className="flex px-6 py-4 hover:bg-emerald-50 hover:shadow-chat-item "
        >
          <Avatar img="" rounded size="md" />
          <div className="flex w-full pl-4 ">
            <div className="flex flex-col justify-center max-w-[196px]  max-h-[61px] ">
              <p className="text-base font-bold text-zinc-900 font-family2">
                Firstname Lastname
              </p>
              <p className=" max-h-[37px] w-full  overflow-ellipsis overflow-hidden whitespace-nowrap text-neutral-600 text-sm font-normal font-family2 leading-[18px]">
                Not too bad, just trying to catch up on some work. How about
                you? Not too bad, just trying to catch up on some work. How
                about you?
              </p>
            </div>
            <div className="flex flex-col gap-2 pl-8">
              <p className="text-sm font-medium text-gray-500 text-end font-family2">
                5s
              </p>
              <div className="text-xl">
                <FaRegCircleCheck />
              </div>
            </div>
          </div>
        </Link>
      </li>
      <div className="w-4/5 mx-auto border bg-zinc-200 last-of-type:hidden "></div>
    </>
  );
};
export default UserListItem;
