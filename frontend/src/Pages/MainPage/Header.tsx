import LogoText from "../../../public/LogoText";
import Form from "./Form";
import NotificationIcon from "./NotificationIcon";

const Header = () => {
  return (
    <header className="flex py-2 w-[1440px] h-[74px] bg-white ml-16 items-center">
      <div className="flex ">
        <img className="mix-blend-darken" src="public/imgF.png" alt="Img F" />
        <LogoText />
      </div>
      <Form />
      <NotificationIcon />
    </header>
  );
};
export default Header;
