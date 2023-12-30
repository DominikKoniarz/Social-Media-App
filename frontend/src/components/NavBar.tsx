import imgF from "@assets/images/imgF.png";
import LinksList from "./LinksList";
import LogoutButton from "./LogoutButton";
import useSocketContext from "hooks/useSocketContext";

const NavBar = () => {
  const { userData } = useSocketContext();
  return (
    <nav className="md:w-[246px] w-[80px] shrink-0 h-full bg-color2 border border-none rounded-r-xl md:rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-center w-full bg-color1 rounded-tr-xl border border-none rounded-tl-xl h-[75px]">
        <div className="p-1 py-2 border border-white rounded-full ">
          <img className="mix-blend-darken" src={imgF} alt="ProfilePicture" />
        </div>
      </div>
      <span className="flex justify-center pt-2 text-lg font-medium text-white md:text-xl">
        {userData?.username}
      </span>
      <LinksList />
      <LogoutButton />
    </nav>
  );
};

export default NavBar;
