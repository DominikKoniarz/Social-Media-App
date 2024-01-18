import { FaMagnifyingGlass } from "react-icons/fa6";

const FormButtonSearch = () => {
  return (
    <button
      type="submit"
      className="md:w-[38px] md:h-[38px] md:p-0 p-3 w-fit h-fit bg-teal-500 text-white rounded-full hidden md:flex md:justify-center md:items-center  text-xl  md:relative shrink-0  "
    >
      <FaMagnifyingGlass />
    </button>
  );
};
export default FormButtonSearch;
