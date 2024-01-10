import { FaBars } from "react-icons/fa6";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarButtonMobile = ({ toggle, setToggle }: Props) => {
  const handleToggle = () => {
    !toggle ? setToggle(true) : setToggle(false);
  };

  return (
    <button
      className={`absolute flex items-center justify-center md:hidden text-3xl left-24  `}
      onClick={handleToggle}
    >
      <FaBars />
    </button>
  );
};
export default NavBarButtonMobile;
