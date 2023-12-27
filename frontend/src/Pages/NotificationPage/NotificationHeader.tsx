import { FaGear } from "react-icons/fa6";

const NotificationHeader = () => {
  return (
    <div className="flex items-center w-full px-8 py-5 bg-white rounded-md">
      <p className="text-2xl font-semibold text-black font-family1">
        Notifications
      </p>
      <button className="absolute text-2xl right-8">
        <FaGear />
      </button>
    </div>
  );
};
export default NotificationHeader;
