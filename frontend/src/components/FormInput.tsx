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
				className="md:w-[687px] py-2 px-4 pr-[50px] h-[46px] bg-white rounded-[100px] border border-black border-opacity-20"
				placeholder="Search new friends"
				id="search-input"
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				autoComplete="off"
				onBlur={() => setSearch("")}
			/>
		</>
	);
};
export default FormInput;
