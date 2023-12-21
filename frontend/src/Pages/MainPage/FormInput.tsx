type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const FormInput = ({ search, setSearch }: Props) => {
  return (
    <>
      <label htmlFor="search-input" className=" hidden absolute left-[-9999px]">
        Search
      </label>
      <input
        required
        className="w-[687px] p-2 pr-[50px] h-[46px] bg-white rounded-[100px] border border-black border-opacity-20"
        placeholder="Search"
        id="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};
export default FormInput;
