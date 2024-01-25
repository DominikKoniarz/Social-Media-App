import { Link } from "react-router-dom";
import LogoText from "@components/LogoText";
import imgF from "@assets/images/imgF.png";

const Header = () => {
	return (
		<header className="flex ">
			<img className="p-4 md:p-0 mix-blend-darken" src={imgF} alt="Img F" />
			<LogoText />
			<div className="flex md:flex-row flex-col text-black md:p-0 p-2 text-center  text-sm font-light leading-[14.50px] items-end md:items-center justify-center md:justify-end w-full">
				Have an account?
				<Link
					className="text-teal-500 mx-2 my-2 md:my-0  text-sm font-medium leading-[14.50px]"
					to="/login"
				>
					Sign in
				</Link>
			</div>
		</header>
	);
};
export default Header;
