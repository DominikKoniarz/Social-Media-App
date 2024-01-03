import Suggestions from "@components/Suggestions";
import Post from "./Post";
import { useState } from "react";
import AddPost from "./AddPost";

const RootPage = () => {
  const [newPost, setNewPost] = useState<string>("");

  return (
    <div className="flex h-full gap-4 px-1 md:gap-16 md:px-32 w-fit">
      <ul className="h-full mx-auto space-y-4 overflow-y-auto posts w-fit">
        <AddPost newPost={newPost} setNewPost={setNewPost} />
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
