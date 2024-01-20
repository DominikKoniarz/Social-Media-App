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
			className={`absolute md:hidden top-0 flex flex-row-reverse ${
				showNavBar ? "left-0" : "-left-[9999px]"
			} w-full h-[calc(100vh-74px)]`}
		>
			<div
				onClick={() => setShowNavBar((prev) => !prev)}
				className={`w-full  h-[calc(100vh-74px)]   md:hidden bg-black opacity-75 duration-500 top-0 transition-colors z-30 `}
			></div>
			<div
				className={` ${
					showNavBar ? "left-0" : "-left-[9999px]"
				} bg-white w-fit h-full  z-50 top-0`}
			>
				<div
					className={` md:hidden  z-50 flex-col bg-white w-full max-w-92 shrink-0`}
				>
					<p className="px-6 pt-6 pb-4 text-2xl font-bold w- text-zinc-900 font-family2">
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
