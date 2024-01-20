import { Avatar } from "flowbite-react";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";
import useGetUserActivity from "hooks/useGetUserActivity";
import { FaEllipsis, FaRegUser } from "react-icons/fa6";

type Props = {
	userId: string;
	avatar: string | null;
	firstname: string | null;
	lastname: string | null;
	username: string;
};

const ChatHeader = ({
	firstname,
	lastname,
	username,
	avatar,
	userId,
}: Props) => {
	const { generateAvatarImageSrc } = useGenerateImageSrc();
	const { data } = useGetUserActivity(userId);

	const getAvatarImageSrcOrIcon = (
		avatar: string | null,
		userId: string
	): string | (() => JSX.Element) => {
		if (avatar) {
			return generateAvatarImageSrc(userId, avatar);
		} else {
			return () => (
				<div className="grid w-10 h-10 border rounded-full place-items-center border-slate-300">
					<FaRegUser />
				</div>
			);
		}
	};

	return (
		<div className="relative flex items-center w-full gap-2 px-6 py-4 mb-4 bg-white">
			<Avatar img={getAvatarImageSrcOrIcon(avatar, userId)} rounded size="md" />
			<div className="flex flex-col">
				<p className="text-xl font-bold text-zinc-900 font-family2 h-fit">
					{firstname && lastname ? `${firstname} ${lastname}` : `@${username}`}
				</p>
				<div className="flex items-center gap-1">
					<div
						className={`p-[3px] border rounded-full ${
							data && data.active
								? "bg-green-600 border-green-600"
								: "bg-red-600 border-red-600"
						}`}
					></div>
					<p className="text-neutral-600 text-base font-normal font-family2 leading-[18px]">
						{data && data.active ? "Active now" : "Offline"}
					</p>
				</div>
			</div>
			<button className="absolute flex items-center justify-center p-3 text-2xl text-gray-400 border rounded-full right-6">
				<FaEllipsis />
			</button>
		</div>
	);
};

export default ChatHeader;
