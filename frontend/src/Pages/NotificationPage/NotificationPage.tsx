import Suggestions from "@components/Suggestions";
import Post from "Pages/RootPage/Post";
import { FaGear } from "react-icons/fa6";

const NotificationPage = () => {
  return (
    <section className="flex h-full gap-16 px-32 w-fit">
      <div className="relative flex flex-col gap-4 ">
        <div className="flex items-center w-full px-8 py-5 bg-white">
          <p className="text-2xl font-semibold text-black font-family1">
            Notifications
          </p>
          <button className="absolute text-2xl right-8">
            <FaGear />
          </button>
        </div>
        <ul className="h-full mx-auto space-y-4 overflow-y-auto notifications w-fit">
          <Post />
          <Post />

          <Post />
          <Post />
        </ul>
      </div>
      <Suggestions />
    </section>
  );
};
export default NotificationPage;
