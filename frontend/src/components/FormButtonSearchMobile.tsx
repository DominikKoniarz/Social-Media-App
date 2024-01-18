import { FaMagnifyingGlass } from "react-icons/fa6";

type Props = {
  searchToggle: boolean;
  setSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormButtonSearchMobile = ({ setSearchToggle, searchToggle }: Props) => {
  const handleToggle = () => {
    !searchToggle ? setSearchToggle(true) : setSearchToggle(false);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="md:w-[38px] md:h-[38px] md:hidden md:p-0 p-3 w-fit h-fit bg-teal-500 text-white rounded-full flex justify-center items-center  text-xl  md:relative shrink-0  "
    >
      <FaMagnifyingGlass />
    </button>
  );
};
export default FormButtonSearchMobile;
