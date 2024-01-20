import { Conversation } from "../../../../types/socket.io";
import UserListItem from "./UserListItem";

type Props = {
	conversations: Conversation[];
	search: string;
};

const UserList = ({ conversations, search }: Props) => {
	console.log(conversations);

	const filteredConversations = conversations.filter(
		(conversation) =>
			conversation.otherUserUsername
				.toLowerCase()
				.includes(search.toLowerCase()) ||
			(conversation.otherUserFirstname &&
				conversation.otherUserFirstname
					.toLowerCase()
					.includes(search.toLowerCase())) ||
			(conversation.otherUserLastname &&
				conversation.otherUserLastname
					.toLowerCase()
					.includes(search.toLowerCase()))
	);

	return (
		<ul className="flex flex-col w-full mt-4 overflow-y-auto h-fit users">
			{conversations.length > 0 ? (
				filteredConversations.length > 0 ? (
					filteredConversations.map((conversation) => (
						<UserListItem key={conversation.id} conversation={conversation} />
					))
				) : (
					<li className="w-full p-5 text-sm text-center">
						Not found any conversations!
					</li>
				)
			) : (
				<li className="w-full p-5 text-sm text-center">
					You don't have any active conversations yet!
				</li>
			)}
		</ul>
	);
};
export default UserList;
