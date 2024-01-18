import FormInput from "./FormInput";
import FormButtonSearch from "./FormButtonSearch";
import SearchResultsList from "./SearchResultsList";
import FormButtonSearchMobile from "./FormButtonSearchMobile";

type Props = {
  searchToggle: boolean;
  setSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isInputFocused: boolean;
};

const Form = ({
  setIsInputFocused,
  isInputFocused,
  setSearchToggle,
  searchToggle,
  search,
  setSearch,
}: Props) => {
  return (
    <form
      className={`relative rounded-[100px] border border-black ${
        searchToggle ? "w-fit" : "w-fit"
      } md:w-fit  border-opacity-20 p-1 md:pr-2 md:flex items-center justify-center ml-auto md:mx-auto`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormInput
        search={search}
        setSearch={setSearch}
        setIsInputFocused={setIsInputFocused}
      />
      <FormButtonSearch />
      <FormButtonSearchMobile
        searchToggle={searchToggle}
        setSearchToggle={setSearchToggle}
      />
      {search && isInputFocused && <SearchResultsList search={search} />}
    </form>
  );
};
export default Form;
