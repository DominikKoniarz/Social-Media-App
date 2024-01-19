import { Link } from "react-router-dom";
import { UserData } from "../../../types/socket.io";
import { FaRegUser } from "react-icons/fa6";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";

type Props = {
	user: Pick<
		UserData,
		"firstname" | "lastname" | "id" | "username" | "avatarImage"
	>;
};

export default function SearchListItem({ user }: Props) {
	const { generateAvatarImageSrc } = useGenerateImageSrc();

	return (
		<li className="w-full transition-colors duration-300 h-fit hover:bg-slate-100">
			<Link
				to={`/profile/${user.id}`}
				className="flex flex-row items-center w-full p-4 gap-x-2"
			>
				<div className="grid w-10 h-10 border border-slate-500 place-items-center">
					{user.avatarImage ? (
						<img
							className="object-cover w-full h-full"
							src={generateAvatarImageSrc(user.id, user.avatarImage)}
						/>
					) : (
						<FaRegUser className="text-lg" />
					)}
				</div>
				<div className="flex flex-col">
					<div className="font-bold">@{user.username}</div>
					{user.firstname && user.lastname && (
						<div className="text-sm">
							{`${user.firstname} ${user.lastname}`}
						</div>
					)}
				</div>
			</Link>
		</li>
	);
}
