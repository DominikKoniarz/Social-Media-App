import useSocketContext from "hooks/useSocketContext";
import { Navigate } from "react-router-dom";

export default function PickConversation() {
	const { conversations } = useSocketContext();

	if (conversations.length > 0) {
		const sortedConversations = conversations.sort(
			(a, b) =>
				new Date(b.messages[0].createdAt).getTime() -
				new Date(a.messages[0].createdAt).getTime()
		);

		return (
			<Navigate to={`/messages/${sortedConversations[0].id}`} replace={true} />
		);
	}

	return (
		<div className="relative flex items-center justify-center w-full h-full text-lg opacity-100 sm:opacity-0">
			No conversations to display!
		</div>
	);
}
