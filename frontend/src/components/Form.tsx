import FormInput from "./FormInput";
import FormButtonSearch from "./FormButtonSearch";
import SearchResultsList from "./SearchResultsList";
import FormButtonSearchMobile from "./FormButtonSearchMobile";
import { useState } from "react";

type Props = {
	searchToggle: boolean;
	setSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({ setSearchToggle, searchToggle, search, setSearch }: Props) => {
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

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
