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
		<div className="max-w-[371px] flex flex-col bg-white">
			<p className="px-6 pt-6 pb-4 text-2xl font-bold text-zinc-900 font-family2">
				Messages
			</p>
			<SearchInput search={search} setSearch={setSearch} />
			<UserList conversations={conversations} search={search} />
		</div>
	);
};
export default MessagesNavBar;
