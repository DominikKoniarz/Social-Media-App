import imgF from "@assets/images/imgF.png";
import LinksList from "./LinksList";
import LogoutButton from "./LogoutButton";
import useSocketContext from "hooks/useSocketContext";

const NavBar = () => {
  const { userData } = useSocketContext();
  return (
    <nav className="w-[246px] shrink-0 h-full bg-color2 border border-none rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-center w-full bg-color1 rounded-tr-xl border border-none rounded-tl-xl h-[75px]">
        <div className="p-1 py-2 border border-white rounded-full ">
          <img className="mix-blend-darken" src={imgF} alt="ProfilePicture" />
        </div>
      </div>
      <span className="flex justify-center pt-2 text-xl font-medium text-white">
        {userData?.username}
      </span>
      <LinksList />
      <LogoutButton />
    </nav>
  );
};

export default NavBar;
