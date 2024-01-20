import { FaMagnifyingGlass } from "react-icons/fa6";
type Props = {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ search, setSearch }: Props) => {
	return (
		<div className="px-6">
			<label htmlFor="search-input" className=" hidden absolute left-[-9999px]">
				Search
			</label>
			<div className="flex items-center gap-3 px-4 py-2 overflow-hidden bg-white border border-black rounded-3xl border-opacity-20">
				<div>
					<FaMagnifyingGlass />
				</div>
				<input
					required
					className="w-full text-base font-normal text-gray-500 bg-white focus:border-none focus:outline-none font-family2"
					placeholder="Search for chats..."
					id="search-input"
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value.trimStart())}
				/>
			</div>
		</div>
	);
};
export default SearchInput;
