import Header from "Pages/RootPage/Header";
import NavBar from "Pages/RootPage/NavBar";

const ProfilePage = () => {
  return (
    <div className="w-full h-full p-0">
      <Header />
      <main className="relative flex h-[calc(100%-74px)]  p-4 px-16 pb-0 bg-zinc-100">
        <NavBar />
      </main>
    </div>
  );
};
export default ProfilePage;
