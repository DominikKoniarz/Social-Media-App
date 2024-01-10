import { useState } from "react";
import FormInput from "./FormInput";
import FormButtonSearch from "./FormButtonSearch";
import SearchResultsList from "./SearchResultsList";

const Form = () => {
	const [search, setSearch] = useState<string>("");
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	return (
		<form
			className="flex items-center justify-center mx-auto max-w-[600px] relative"
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
