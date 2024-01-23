import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import UserList from "./UserList";
import { Conversation } from "../../../../types/socket.io";
import { useLocation } from "react-router-dom";

type Props = {
	showNavBar: boolean;
	conversations: Conversation[];
	setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessagesNavBarMobile = ({
	conversations,
	showNavBar,
	setShowNavBar,
}: Props) => {
	const [search, setSearch] = useState<string>("");
	const { key } = useLocation();

	useEffect(() => {
		setShowNavBar((prev) => !prev);
	}, [key]);

	return (
		<div
			className={`absolute lg:hidden z-20 top-0 flex flex-row-reverse ${
				showNavBar ? "left-0" : "-left-[9999px]"
			} w-full h-[calc(100vh-74px)]  md:h-[calc(100vh-106px)]`}
		>
			<div
				onClick={() => setShowNavBar((prev) => !prev)}
				className={`w-full h-full md:hidden bg-black opacity-75 duration-500 top-0 transition-colors z-30 `}
			></div>
			<div className={`bg-white w-full h-full z-40 top-0`}>
				<div
					className={`lg:hidden z-40 flex-col bg-white w-full lg:max-w-92 shrink-0`}
				>
					<p className="px-6 pt-6 pb-4 text-2xl font-bold text-zinc-900 font-family2">
						Messages
					</p>
					<SearchInput search={search} setSearch={setSearch} />
					<UserList conversations={conversations} search={search} />
				</div>
			</div>
		</div>
	);
};
export default MessagesNavBarMobile;
