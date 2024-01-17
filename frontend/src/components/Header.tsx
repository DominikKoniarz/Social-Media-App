import LogoText from "./LogoText";
import Form from "./Form";
import imgF from "@assets/images/imgF.png";
import { useState } from "react";
import AddPostButton from "@components/AddPostButton";
import AddPostModal from "./AddPostModal";
import NavBarButtonMobile from "./NavBarButtonMobile";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ toggle, setToggle }: Props) => {
  const [addPostModalOpen, setAddPostModalOpen] = useState<boolean>(false);

  return (
    <header className="w-full h-[74px] bg-white">
      <div className="py-2 px-4 mx-auto gap-4 md:gap-16 max-w-[1920px] w-full flex justify-between items-center h-full">
        <div className="flex shrink-0">
          <img className="mix-blend-darken" src={imgF} alt="Img F" />
          <LogoText />
        </div>
        <NavBarButtonMobile toggle={toggle} setToggle={setToggle} />
        <Form />
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
