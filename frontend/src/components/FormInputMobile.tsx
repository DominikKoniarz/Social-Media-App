type Props = {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setIsMobileInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormInputMobile = ({
	search,
	setSearch,
	setIsMobileInputFocused,
}: Props) => {
	return (
		<>
			<label htmlFor="search-input" className="hidden absolute left-[-9999px]">
				Search users
			</label>
			<input
				required
				className={`w-full md:hidden absolute mx-auto top-[4.5rem] z-50 rounded-b-md focus:outline-none py-2 px-4 border-none h-[46px] bg-white `}
				placeholder="Search new friends"
				id="search-input"
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				autoComplete="off"
				onFocus={() => setIsMobileInputFocused(true)}
				onBlur={() => setTimeout(() => setIsMobileInputFocused(false), 200)}
			/>
		</>
	);
};
export default FormInputMobile;
