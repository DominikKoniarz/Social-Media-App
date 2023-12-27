import LogoText from "./LogoText";
import Form from "./Form";
import NotificationIcon from "./NotificationIcon";
import imgF from "@assets/images/imgF.png";

const Header = () => {
  return (
    <header className="w-full h-[74px] bg-white">
      <div className="py-2 px-4 mx-auto max-w-[1920px] w-full flex items-center h-full">
        <div className="flex">
          <img className="mix-blend-darken" src={imgF} alt="Img F" />
          <LogoText />
        </div>
        <Form />
        <NotificationIcon />
      </div>
    </header>
  );
};
export default Header;
