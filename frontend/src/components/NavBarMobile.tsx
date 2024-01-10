import imgF from "@assets/images/imgF.png";
import LinksList from "./LinksList";
import LogoutButton from "./LogoutButton";
import useSocketContext from "hooks/useSocketContext";
import { APP_URL } from "constraints";

type Props = {
  toggle: boolean;
};

const NavBarMobile = ({ toggle }: Props) => {
  const { userData } = useSocketContext();

  return (
    <>
      <div
        className={`w-full h-full absolute md:hidden bg-black opacity-75 duration-500 transition-colors z-30  ${
          toggle ? "left-0" : "-left-[9999px]"
        } 
        
        `}
      ></div>
      <nav
        className={`md:w-[246px] ${
          toggle ? "left-0" : "-left-[9999px]"
        }   absolute md:hidden  z-50 w-[80px] shrink-0 h-full bg-color2 border border-none rounded-r-xl md:rounded-xl overflow-hidden flex flex-col`}
      >
        <div className="flex items-center justify-center w-full bg-color1 rounded-tr-xl border border-none rounded-tl-xl h-[75px]">
          <div className="border-2 border-white rounded-full max-w-16 max-h-16 ">
            {userData && userData.avatarImage ? (
              <img
                className="w-full h-full rounded-full "
                src={`${APP_URL}/media/${userData.id}/avatar/${userData.avatarImage}`}
                alt="ProfilePicture"
              />
            ) : (
              <img
                className="mix-blend-darken"
                src={imgF}
                alt="ProfilePicture"
              />
            )}
          </div>
        </div>
        <span className="flex justify-center pt-2 text-lg font-medium text-white md:text-xl">
          {userData?.username}
        </span>
        <LinksList />
        <LogoutButton />
      </nav>
    </>
  );
};

export default NavBarMobile;
