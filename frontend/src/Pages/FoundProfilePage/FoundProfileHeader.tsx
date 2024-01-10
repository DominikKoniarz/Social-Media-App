import { FaPanorama, FaRegUser, FaShareNodes } from "react-icons/fa6";
import { UserData } from "../../../../types/socket.io";
import useGenerateImageSrc from "hooks/useGenerateImagesSrc";

type Props = {
	foundUserData: UserData;
};

const FoundProfileHeader = ({ foundUserData }: Props) => {
	const { generateBackgroundImageSrc, generateAvatarImageSrc } =
		useGenerateImageSrc();

	return (
		<div className="relative flex flex-col w-full h-fit">
			{foundUserData.backgroundImage ? (
				<div className="w-full h-[257px] flex justify-center items-center  ">
					<img
						className="object-cover w-full h-full"
						src={generateBackgroundImageSrc(
							foundUserData.id,
							foundUserData.backgroundImage
						)}
						alt="ProfileBackground"
					/>
				</div>
			) : (
				<div className="flex items-center justify-center w-full bg-slate-600 h-[257px]">
					<FaPanorama className="text-white text-7xl" />
				</div>
			)}
			<div className="absolute grid place-items-center border-2 bottom-[7px] border-slate-200 rounded-md overflow-hidden left-10 h-[118px] w-[128px] bg-slate-50">
				{foundUserData.avatarImage ? (
					<img
						className="absolute object-cover w-full h-full"
						src={generateAvatarImageSrc(
							foundUserData.id,
							foundUserData.avatarImage
						)}
						alt="ProfilePicture"
					/>
				) : (
					<FaRegUser className="text-3xl" />
				)}
			</div>
			<div className="flex items-center justify-end gap-4 px-4 pt-6 ">
				<button className="w-[42px] h-[42px] flex justify-center items-center rounded-full border border-teal-500">
					<FaShareNodes />
				</button>
			</div>
		</div>
	);
};
export default FoundProfileHeader;
