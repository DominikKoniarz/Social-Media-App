import imgF from "@assets/imgF.png";
import LinksList from "./LinksList";

const NavBar = () => {
	return (
		<nav className="w-[246px] h-full bg-color2 border border-none rounded-tl-xl flex flex-col rounded-tr-xl">
			<div className="flex items-center justify-center w-full bg-color1 rounded-tr-xl  border border-none rounded-tl-xl h-[75px]">
				<img className="mix-blend-darken" src={imgF} alt="ProfilePicture" />
			</div>
			<span className="flex justify-center pt-2 text-xl font-medium text-white">
				Placeholder
			</span>
			<LinksList />
			<button className="w-[246px] h-[50px] bg-color1 flex justify-center items-center mt-auto">
				<span className="text-lg font-semibold text-white">LOGOUT</span>
			</button>
		</nav>
	);
};

export default NavBar;
