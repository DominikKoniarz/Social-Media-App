import ProfileEditHeader from "./ProfileEditHeader";
import useSocketContext from "hooks/useSocketContext";
import Loader from "./Loader";
import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = () => {
	const { userData } = useSocketContext();

	return (
		<div className="w-full h-full px-4 pt-4 md:pt-0 md:px-6">
			<ProfileEditHeader />
			{userData ? (
				<ProfileEditForm userData={userData} />
			) : (
				<div className="py-32 bg-white h-fit ">
					<Loader />
				</div>
			)}
		</div>
	);
};
export default ProfileEdit;
