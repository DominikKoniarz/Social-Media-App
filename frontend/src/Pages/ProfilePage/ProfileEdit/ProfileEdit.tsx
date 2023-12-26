import { useEffect, useState } from "react";
import UserNameInput from "./UserNameInput";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import ProfileEditHeader from "./ProfileEditHeader";
import LocationInput from "./LocationInput";
import Bio from "./Bio";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import WebsiteURLInput from "./WebsiteUrlInput";
import useSocketContext from "hooks/useSocketContext";
import Loader from "./Loader";

const ProfileEdit = () => {
	const [userName, setUserName] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [websiteURL, setWebsiteURL] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [bio, setBio] = useState<string>("");
	const { userData } = useSocketContext();

	useEffect(() => {
		if (userData) {
			setUserName(userData.username);
			setFirstName(userData.firstname || "");
			setLastName(userData.lastname || "");
			setWebsiteURL(userData.websiteURL || "");
			setLocation(userData.location || "");
			setBio(userData.bio || "");
		}
	}, [userData]);

	return (
		<div className="w-full h-full px-6">
			<ProfileEditHeader />
			{userData ? (
				<form
					className="flex flex-col w-full px-10 pt-24 pb-10 space-y-4 bg-white h-fit "
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="flex w-full gap-12">
						<UserNameInput userName={userName} setUserName={setUserName} />
						<div className="flex gap-8 w-[60%]">
							<FirstNameInput
								firstName={firstName}
								setFirstName={setFirstName}
							/>
							<LastNameInput lastName={lastName} setLastName={setLastName} />
						</div>
					</div>
					<div className="flex w-full gap-12">
						<WebsiteURLInput
							websiteURL={websiteURL}
							setWebsiteURL={setWebsiteURL}
						/>
						<LocationInput location={location} setLocation={setLocation} />
					</div>
					<Bio bio={bio} setBio={setBio} />
					<div className="flex gap-8 w-[50%]">
						<SaveButton />
						<CancelButton />
					</div>
				</form>
			) : (
				<Loader />
			)}
		</div>
	);
};
export default ProfileEdit;
