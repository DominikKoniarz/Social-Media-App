import Post from "Pages/RootPage/Post";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
  return (
    <main className="w-full h-full px-6 mx-auto overflow-y-auto profile">
      <div className="bg-white">
        <ProfileHeader />
        <ProfileBody />
      </div>
      <div className="flex h-full ">
        <ul className="py-2 space-y-4 h-fit w-fit">
          <Post />

          <Post />

          <Post />
        </ul>
      </div>
    </main>
  );
};
export default ProfilePage;
