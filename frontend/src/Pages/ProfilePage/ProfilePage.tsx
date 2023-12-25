import ProfileBackground from "@assets/images/ProfileBackground.png";
import ProfilePicture from "@assets/images/ProfilePicture.png";

const ProfilePage = () => {
  return (
    <div className="w-full h-full px-32">
      <div className="flex flex-col w-full h-fit">
        <img src={ProfileBackground} alt="ProfileBackground" />
        <div className="absolute mt-32 ml-12">
          <img src={ProfilePicture} alt="ProfilePicture" />
        </div>
        <div className="flex items-center justify-end "></div>
      </div>
      <div className="w-full h-fit"></div>
    </div>
  );
};
export default ProfilePage;
