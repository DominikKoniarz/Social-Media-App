import LogoText from "./LogoText";
import Form from "./Form";
import imgF from "@assets/images/imgF.png";
import { useState } from "react";
import AddPostButton from "@components/AddPostButton";
import AddPostModal from "./AddPostModal";
import NavBarButtonMobile from "./NavBarButtonMobile";
import FormInputMobile from "./FormInputMobile";
import SearchResultsList from "./SearchResultsList";
import { Link } from "react-router-dom";

type Props = {
	toggle: boolean;
	setToggle: React.Dispatch<React.SetStateAction<boolean>>;
	searchToggle: boolean;
	setSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
	toggle,
	setToggle,
	setSearchToggle,
	searchToggle,
}: Props) => {
	const [addPostModalOpen, setAddPostModalOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [searchMobile, setSearchMobile] = useState<string>("");
	const [isMobileInputFocused, setIsMobileInputFocused] =
		useState<boolean>(false);

	return (
		<header className="w-full h-[74px] relative bg-white">
			{searchToggle && (
				<>
					<div className="absolute md:hidden left-0 z-30 w-full h-[calc(100vh-72px)] overflow-hidden transition-colors duration-500 bg-black opacity-75 top-[4.5rem]"></div>
					<FormInputMobile
						search={searchMobile}
						setSearch={setSearchMobile}
						setIsMobileInputFocused={setIsMobileInputFocused}
					/>
					<div className="block md:hidden">
						{searchMobile && isMobileInputFocused && (
							<SearchResultsList search={searchMobile} />
						)}
					</div>
				</>
			)}
			<div className="py-2 px-4 mx-auto gap-4 md:gap-16 max-w-[1920px] w-full flex justify-between items-center h-full">
				<Link to="/" className="flex shrink-0">
					<img className="mix-blend-darken" src={imgF} alt="Img F" />
					<LogoText />
				</Link>
				<NavBarButtonMobile toggle={toggle} setToggle={setToggle} />
				<Form
					search={search}
					setSearch={setSearch}
					searchToggle={searchToggle}
					setSearchToggle={setSearchToggle}
				/>
				<div className="flex items-center gap-4">
					<AddPostButton setAddPostModalOpen={setAddPostModalOpen} />
				</div>
			</div>
			<AddPostModal
				addPostModalOpen={addPostModalOpen}
				setAddPostModalOpen={setAddPostModalOpen}
			/>
		</header>
	);
};
export default Header;
