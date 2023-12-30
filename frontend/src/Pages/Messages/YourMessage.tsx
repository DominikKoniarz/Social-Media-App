import { Avatar } from "flowbite-react";

const YourMessage = () => {
  return (
    <li className="flex flex-col gap-2  right-4">
      <div className="flex flex-row-reverse items-end gap-2">
        <Avatar img="" rounded size="md" />
        <div className="p-5 max-w-[380px] bg-teal-500 rounded-br-none rounded-3xl text-white text-sm font-medium font-family2 leading-[18px]">
          Animations can enhance user engagement, but use them judiciously.
          Subtle animations for transitions or highlighting elements can make
          the site feel dynamic without overwhelming users.
        </div>
      </div>
      <p className="px-12 text-xs font-medium text-right text-gray-500 font-family2">
        10:45 AM
      </p>
    </li>
  );
};
export default YourMessage;
