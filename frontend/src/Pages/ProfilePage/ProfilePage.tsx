import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

import media1 from "@assets/images/mediaImages/media1.png";
import media2 from "@assets/images/mediaImages/media2.png";
import media3 from "@assets/images/mediaImages/media3.png";
import media4 from "@assets/images/mediaImages/media4.png";
import media5 from "@assets/images/mediaImages/media5.png";
import media6 from "@assets/images/mediaImages/media6.png";

const ProfilePage = () => {
  return (
    <main className="w-full h-full px-6 pt-2 mx-auto overflow-y-auto md:pt-0 profile">
      <section className="bg-white">
        <ProfileHeader />
        <ProfileBody />
      </section>
      <section className="flex w-full h-full gap-4 pt-4 ">
        <ProfilePosts />
        <section className="hidden px-4 py-4 bg-white min-w-[634.75px] 2xl:block h-fit">
          <p className="flex justify-center p-1 text-lg font-medium text-zinc-950 font-family1">
            My media
          </p>
          <article className="flex flex-wrap justify-center gap-4 w-fit ">
            <img className="p-2 rounded-md" src={media1} alt="media1" />
            <img className="p-2 rounded-md" src={media2} alt="media2" />
            <img className="p-2 rounded-md" src={media3} alt="media3" />
            <img className="p-2 rounded-md" src={media4} alt="media4" />
            <img className="p-2 rounded-md" src={media5} alt="media5" />
            <img className="p-2 rounded-md" src={media6} alt="media6" />
          </article>
        </section>
      </section>
    </main>
  );
};
export default ProfilePage;
