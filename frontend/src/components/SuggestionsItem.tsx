import {
	FaEllipsisVertical,
	FaRegEnvelope,
	FaShareNodes,
} from "react-icons/fa6";
import { Suggestion } from "../../../types/socket.io";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";
import toast from "react-hot-toast";
import useGenerateShareUrl from "hooks/useGenerateShareUrl";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
	suggestion: Suggestion;
};

const SuggestionsItem = ({ suggestion }: Props) => {
	const { generateAvatarImageSrc, generateBackgroundImageSrc } =
		useGenerateImageSrc();
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const generateShareUrl = useGenerateShareUrl();

	const saveToClipBoard = async () => {
		const URL = generateShareUrl(suggestion.id);
		try {
			await navigator.clipboard.writeText(URL);
			toast.success("Copied to clipboard!");
		} catch (error) {
			toast.success(`Could not copy for unknown reason. URL is ${URL}`);
		}
	};

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
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsClicked((prev) => !prev);
						}}
						className="relative text-xl text-white"
					>
						<FaEllipsisVertical />
						<div
							className={`${
								isClicked ? "flex flex-col" : "hidden"
							} absolute left-8 -top-8 border border-black rounded-md bg-white p-1 gap-1`}
						>
							<Link
								to={`/messages/new/${suggestion.id}`}
								state={{ userData: { ...suggestion } }}
								type="button"
								className="w-[42px] h-[42px] flex justify-center items-center rounded-full border text-black border-teal-500"
							>
								<FaRegEnvelope />
							</Link>
							<button
								type="button"
								onClick={(e) => {
									saveToClipBoard();
									e.stopPropagation();
								}}
								className="w-[42px] h-[42px] flex justify-center items-center rounded-full border text-black border-teal-500"
							>
								<FaShareNodes />
							</button>
						</div>
					</button>
				</div>
				<div className="flex flex-col w-full gap-px left-2">
					<p className="w-full overflow-hidden text-base font-semibold leading-3 text-white whitespace-nowrap overflow-ellipsis drop-shadow-2xl font-family1">
						@{suggestion.username}
					</p>
					<p className="w-full overflow-hidden text-sm font-light text-white lowercase whitespace-nowrap overflow-ellipsis drop-shadow-2xl font-family1">
						{suggestion.email}
					</p>
				</div>
			</div>
		</li>
	);
};
export default SuggestionsItem;
