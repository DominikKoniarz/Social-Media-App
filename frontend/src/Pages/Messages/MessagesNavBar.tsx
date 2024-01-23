import { useState } from "react";
import SearchInput from "./SearchInput";
import UserList from "./UserList";
import { Conversation } from "../../../../types/socket.io";

type Props = {
	conversations: Conversation[];
};

const MessagesNavBar = ({ conversations }: Props) => {
	const [search, setSearch] = useState<string>("");

	return (
		<div className="flex-col hidden bg-white lg:flex w-72 xl:w-92 shrink-0">
			<p className="px-6 pt-6 pb-4 text-2xl font-bold text-zinc-900 font-family2">
				Messages
			</p>
			<SearchInput search={search} setSearch={setSearch} />
			<UserList conversations={conversations} search={search} />
		</div>
	);
};
export default MessagesNavBar;
