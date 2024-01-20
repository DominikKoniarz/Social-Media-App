import { Avatar } from "flowbite-react";
import { FaRegCircleCheck, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Conversation } from "../../../../types/socket.io";
import useCalculateElapsedTime from "hooks/useCalculateElapsedTime";
import useGenerateConversationUrl from "hooks/useGenerateConversationUrl";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";
import useGetUserActivity from "hooks/useGetUserActivity";

type Props = {
	conversation: Conversation;
};

const UserListItem = ({ conversation }: Props) => {
	const { data } = useGetUserActivity(conversation.otherUserId);
	const { generateAvatarImageSrc } = useGenerateImageSrc();
	const calculateElapsedTime = useCalculateElapsedTime();

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

	const newestMessage = conversation.messages.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	)[0];

	return (
		<>
			<li>
				<Link
					to={conversationUrl}
					className="flex px-3 py-2 hover:bg-emerald-50 hover:shadow-chat-item"
				>
					<Avatar
						img={avatarImage}
						theme={{
							root: {
								status: {
									base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white",
									busy: "bg-red-600",
									online: "bg-green-600",
								},
							},
						}}
						status={data && data.active ? "online" : "busy"}
						statusPosition="bottom-right"
						rounded
						size="md"
						className="border-none shrink-0"
					/>
					<div className="flex justify-between max-w-[300px] w-full pl-3">
						<div className="flex flex-col justify-center max-w-[196px] pr-4 max-h-[61px]">
							<p className="text-sm font-bold text-left text-zinc-900 font-family2">
								{conversation.otherUserFirstname &&
								conversation.otherUserLastname
									? `${conversation.otherUserFirstname} ${conversation.otherUserLastname}`
									: `@${conversation.otherUserUsername}`}
							</p>
							<p className="max-h-[37px] w-32  overflow-ellipsis overflow-hidden whitespace-nowrap text-neutral-600 text-sm font-normal font-family2 leading-[18px]">
								{newestMessage.textContent}
							</p>
						</div>
						<div className="flex flex-col items-end gap-2 ">
							<p className="text-sm font-medium text-gray-500 text-end font-family2 whitespace-nowrap ">
								{calculateElapsedTime(new Date(newestMessage.createdAt))}
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
