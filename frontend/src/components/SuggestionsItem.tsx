import { FaEllipsisVertical } from "react-icons/fa6";
import { Suggestion } from "../../../types/socket.io";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";

type Props = {
	suggestion: Suggestion;
};

const SuggestionsItem = ({ suggestion }: Props) => {
	const { generateAvatarImageSrc, generateBackgroundImageSrc } =
		useGenerateImageSrc();

	return (
		<li className="relative block w-[212px] h-[95px] shrink-0">
			<img
				className="object-cover w-full h-full"
				src={generateBackgroundImageSrc(
					suggestion.id,
					suggestion.backgroundImage
				)}
				alt={`${suggestion.username} background image`}
			/>
			<div className="absolute top-0 left-0 w-full h-full p-1.5 pr-0.5 flex flex-col justify-between gap-2">
				<div className="flex flex-row justify-between">
					<div className="grid overflow-hidden border-2 border-white rounded-full left-2 top-1 w-9 h-9 place-items-center">
						<img
							src={generateAvatarImageSrc(
								suggestion.id,
								suggestion.avatarImage
							)}
							className="object-cover w-full h-full"
							alt={`${suggestion.username} avatar image`}
						/>
					</div>
					<div className="text-xl text-white">
						<FaEllipsisVertical />
					</div>
				</div>
				<div className="flex flex-col w-full gap-px left-2">
					<p className="w-full overflow-hidden text-base font-semibold leading-3 text-white whitespace-nowrap overflow-ellipsis custom-outline2 font-family1">
						@{suggestion.username}
					</p>
					<p className="w-full overflow-hidden text-sm font-light text-white lowercase whitespace-nowrap overflow-ellipsis font-family1">
						{suggestion.email}
					</p>
				</div>
			</div>
		</li>
	);
};
export default SuggestionsItem;
