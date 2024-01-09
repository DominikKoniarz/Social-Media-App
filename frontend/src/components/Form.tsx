import { useState } from "react";
import FormInput from "./FormInput";
import FormButtonSearch from "./FormButtonSearch";
import SearchResultsList from "./SearchResultsList";

const Form = () => {
	const [search, setSearch] = useState<string>("");

	return (
		<form
			className="flex items-center justify-center mx-auto max-w-[600px] relative"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<FormInput search={search} setSearch={setSearch} />
			<FormButtonSearch />
			{search && <SearchResultsList search={search} />}
		</form>
	);
};
export default Form;
