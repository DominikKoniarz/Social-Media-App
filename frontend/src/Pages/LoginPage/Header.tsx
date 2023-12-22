import { Link } from "react-router-dom";
import imgF from "../../assets/imgF.png";
import LogoText from "../../components/LogoText";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row">
      <img className="p-8 mix-blend-darken md:p-0" src={imgF} alt="Img F" />
      <LogoText />
      <div className="flex md:flex-row flex-col text-black md:p-0 p-4 pb-0  text-sm font-light leading-[14.50px] items-center justify-center md:justify-end w-full ">
        Don't have an account?
        <Link
          className="text-teal-500 mx-2 my-2 md:my-0  text-sm font-medium leading-[14.50px]"
          to="/register"
        >
          Sign up!
        </Link>
      </div>
    </header>
  );
};
export default Header;
