import UserPost from "./UserPost";

const ProfilePosts = () => {
  return (
    <ul className="w-full space-y-4 h-fit">
      <UserPost />
      <UserPost />
      <UserPost />
    </ul>
  );
};
export default ProfilePosts;
