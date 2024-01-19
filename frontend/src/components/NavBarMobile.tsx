import LinksList from "./LinksList";
import LogoutButton from "./LogoutButton";
import useSocketContext from "hooks/useSocketContext";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";
import { FaRegUser } from "react-icons/fa6";

type Props = {
  toggle: boolean;
};

const NavBarMobile = ({ toggle }: Props) => {
  const { userData } = useSocketContext();
  const { generateAvatarImageSrc } = useGenerateImageSrc();

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
          <div className="w-16 h-16 overflow-hidden border-2 border-white rounded-full">
            {userData && userData.avatarImage ? (
              <img
                className="w-full h-full rounded-full "
                src={generateAvatarImageSrc(userData.id, userData.avatarImage)}
                alt="ProfilePicture"
              />
            ) : (
              <div className="grid w-full h-full bg-white place-items-center">
                <FaRegUser className="text-lg" />
              </div>
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
