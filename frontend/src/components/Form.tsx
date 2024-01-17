import { useState } from "react";
import FormInput from "./FormInput";
import FormButtonSearch from "./FormButtonSearch";
import SearchResultsList from "./SearchResultsList";

const Form = () => {
  const [search, setSearch] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  return (
    <form
      className="relative rounded-[100px]  border border-black  border-opacity-20 p-1 md:pr-2 flex items-center justify-center ml-auto md:mx-auto w-fit"
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
      {search && isInputFocused && <SearchResultsList search={search} />}
    </form>
  );
};
export default Form;
