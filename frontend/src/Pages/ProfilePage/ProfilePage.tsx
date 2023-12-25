import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
  return (
    <main className="w-full h-full px-32">
      <div className="bg-white">
        <ProfileHeader />
        <ProfileBody />
      </div>
    </main>
  );
};
export default ProfilePage;
