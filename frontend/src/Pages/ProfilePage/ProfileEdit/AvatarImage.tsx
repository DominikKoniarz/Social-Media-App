import { FaPen, FaRegUser } from "react-icons/fa6";
import ProfilePicture from "@assets/images/ProfilePicture.png";
import useSocketContext from "hooks/useSocketContext";
import { APP_URL } from "constraints";

type Props = {
	setProfileImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AvatarImage = ({ setProfileImageModal }: Props) => {
	const { userData } = useSocketContext();

	const imageSrc = userData
		? `${APP_URL}/media/${userData.id}/avatar/${userData.avatarImage}`
		: ProfilePicture;

	return (
		<button
			className="absolute bottom-0 block translate-y-1/2 rounded-md left-10"
			onClick={() => setProfileImageModal(true)}
		>
			<div className="relative grid bg-slate-50 place-items-center w-[128px] h-[118px] rounded-md border-slate-200 border-2 group overflow-hidden">
				<div className="absolute top-0 left-0 z-10 grid w-full h-full text-xl text-white transition-all duration-300 bg-black bg-opacity-0 rounded-md opacity-0 place-items-center group-hover:opacity-100 group-hover:bg-opacity-50">
					<FaPen />
				</div>
				{userData && userData.avatarImage ? (
					<img
						className="absolute object-cover w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-md left-1/2 top-1/2"
						src={imageSrc}
						alt="ProfilePicture"
					/>
				) : (
					<FaRegUser className="text-3xl" />
				)}
			</div>
		</button>
	);
};
export default AvatarImage;
