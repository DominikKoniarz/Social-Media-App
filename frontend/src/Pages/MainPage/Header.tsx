import LogoText from "../../components/LogoText";
import Form from "./Form";
import NotificationIcon from "./NotificationIcon";
import imgF from "../../assets/imgF.png";

const Header = () => {
  return (
    <header className="flex py-2 max-w-[1440px] h-[74px] bg-white mx-auto items-center">
      <div className="flex ">
        <img className="mix-blend-darken" src={imgF} alt="Img F" />
        <LogoText />
      </div>
      <Form />
      <NotificationIcon />
    </header>
  );
};
export default Header;
