import { Avatar } from "flowbite-react";
import { FaRegCircleCheck, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Conversation } from "../../../../types/socket.io";
import useCalculateElapsedTime from "hooks/useCalculateElapsedTime";
import useGenerateConversationUrl from "hooks/useGenerateConversationUrl";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";

type Props = {
	conversation: Conversation;
};

const UserListItem = ({ conversation }: Props) => {
	const { generateAvatarImageSrc } = useGenerateImageSrc();
	const elapsedTime = useCalculateElapsedTime(
		new Date(conversation.messages[0].createdAt)
	);

	const conversationUrl = useGenerateConversationUrl(conversation.id);

	// let i if bo eslint krzyczał
	let avatarImage: string | (() => JSX.Element) = "";
	if (conversation.otherUserAvatarImage) {
		avatarImage = generateAvatarImageSrc(
			conversation.otherUserId,
			conversation.otherUserAvatarImage
		);
	} else {
		avatarImage = () => (
			<div className="grid w-10 h-10 border rounded-full place-items-center border-slate-300">
				<FaRegUser />
			</div>
		);
	}

	return (
		<>
			<li>
				<Link
					to={conversationUrl}
					className="flex px-6 py-4 hover:bg-emerald-50 hover:shadow-chat-item"
				>
					<Avatar img={avatarImage} rounded size="md" className="shrink-0" />
					<div className="flex justify-between w-full pl-3">
						<div className="flex flex-col justify-center max-w-[196px] max-h-[61px]">
							<p className="text-base font-bold text-zinc-900 font-family2">
								{conversation.otherUserFirstname &&
								conversation.otherUserLastname
									? `${conversation.otherUserFirstname} ${conversation.otherUserLastname}`
									: `@${conversation.otherUserUsername}`}
							</p>
							<p className="max-h-[37px] w-full overflow-ellipsis overflow-hidden whitespace-nowrap text-neutral-600 text-sm font-normal font-family2 leading-[18px]">
								{conversation.messages[0].textContent}
							</p>
						</div>
						<div className="flex flex-col items-end gap-2 pl-8">
							<p className="text-sm font-medium text-gray-500 text-end font-family2 whitespace-nowrap">
								{elapsedTime}
							</p>
							<div className="text-xl">
								<FaRegCircleCheck />
							</div>
						</div>
					</div>
				</Link>
			</li>
			<div className="w-4/5 mx-auto border bg-zinc-200 last-of-type:hidden"></div>
		</>
	);
};

export default UserListItem;
