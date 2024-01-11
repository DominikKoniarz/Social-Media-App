type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormInput = ({ search, setSearch, setIsInputFocused }: Props) => {
  return (
    <>
      <label htmlFor="search-input" className=" hidden absolute left-[-9999px]">
        Search
      </label>
      <input
        required
        className="lg:w-[687px] md:max-w-[400px] hidden md:block focus:outline-none py-2 px-4 border-none h-[46px] bg-white "
        placeholder="Search new friends"
        id="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
      />
    </>
  );
};
export default FormInput;
