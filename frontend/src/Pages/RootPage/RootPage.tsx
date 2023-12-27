import Suggestions from "@components/Suggestions";
import Post from "./Post";

const RootPage = () => {
  return (
    <div className="flex h-full gap-16 px-32 w-fit">
      <ul className="h-full mx-auto space-y-4 overflow-y-auto posts w-fit">
        <Post />
        <Post />
        <Post />
        <Post />
      </ul>
      <Suggestions />
    </div>
  );
};
export default RootPage;
