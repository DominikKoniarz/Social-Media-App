import { FaMagnifyingGlass } from "react-icons/fa6";

const FormButtonSearch = () => {
  return (
    <button
      type="submit"
      className="md:w-[38px] md:h-[38px] md:p-0 p-3 w-fit h-fit bg-teal-500 text-white rounded-full flex justify-center text-xl  items-center md:-ml-[42px]   md:relative  shrink-0"
    >
      <FaMagnifyingGlass />
    </button>
  );
};
export default FormButtonSearch;
