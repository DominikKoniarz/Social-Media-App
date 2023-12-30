import { Avatar } from "flowbite-react";

const UserMessages = () => {
  return (
    <li className="flex flex-col gap-2  left-4">
      <div className="flex items-end gap-2">
        <Avatar img="" rounded size="md" />
        <div className="p-5 max-w-[380px] bg-white rounded-bl-none rounded-3xl text-zinc-900 text-sm font-medium font-family2 leading-[18px]">
          Got it. And what's your take on incorporating animations? I've seen
          them on many sites lately.
        </div>
      </div>
      <p className="px-12 text-xs font-medium text-gray-500 font-family2">
        10:45 AM
      </p>
    </li>
  );
};
export default UserMessages;
