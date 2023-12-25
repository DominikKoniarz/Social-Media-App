import Post from "./Post";

const RootPage = () => {
  return (
    <ul className="h-full mx-auto space-y-4 overflow-y-auto posts w-fit">
      <Post />
      <Post />
      <Post />
      <Post />
    </ul>
  );
};
export default RootPage;
