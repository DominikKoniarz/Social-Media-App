import { useState } from "react";

import FormInput from "./FormInput";
import FormButtonSearch from "./FormButtonSearch";

const Form = () => {
	const [search, setSearch] = useState<string>("");

	return (
		<form
			className="flex items-center justify-center mx-auto"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<FormInput search={search} setSearch={setSearch} />
			<FormButtonSearch />
		</form>
	);
};
export default Form;
