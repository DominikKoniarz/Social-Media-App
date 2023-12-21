import Header from "./Header";
import ProfileBar from "./ProfileBar";

const MainPage = () => {
  return (
    <div>
      <Header />
      <main className="flex p-4 px-16 pb-0 bg-zinc-100">
        <ProfileBar />
      </main>
    </div>
  );
};
export default MainPage;
