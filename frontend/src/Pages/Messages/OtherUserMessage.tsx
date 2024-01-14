import { Avatar } from "flowbite-react";
import useCalculateElapsedTime from "hooks/useCalculateElapsedTime";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";
import { FaRegUser } from "react-icons/fa6";

type Props = {
	avatar: string | null;
	textContent: string;
	createdAt: string;
	userId: string;
};

const OtherUserMessage = ({
	avatar,
	textContent,
	createdAt,
	userId,
}: Props) => {
	const { generateAvatarImageSrc } = useGenerateImageSrc();
	const elapsedTime = useCalculateElapsedTime(new Date(createdAt));

	const getAvatarImageSrcOrIcon = (avatar: string | null, userId: string) => {
		if (avatar) {
			return generateAvatarImageSrc(userId, avatar);
		} else {
			return () => (
				<div className="grid w-10 h-10 bg-white border rounded-full place-items-center border-slate-300">
					<FaRegUser />
				</div>
			);
		}
	};

	return (
		<li className="flex flex-col gap-2 left-4">
			<div className="flex items-end gap-2">
				<Avatar
					img={getAvatarImageSrcOrIcon(avatar, userId)}
					rounded
					size="md"
				/>
				<div className="p-5 max-w-[380px] bg-white rounded-bl-none rounded-3xl text-zinc-900 text-sm font-medium font-family2 leading-[18px]">
					{textContent}
				</div>
			</div>
			<p className="px-12 text-xs font-medium text-gray-500 font-family2">
				{elapsedTime}
			</p>
		</li>
	);
};

export default OtherUserMessage;
