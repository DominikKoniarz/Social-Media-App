import { useEffect, useState } from "react";
import Bio from "./Bio";
import CancelButton from "./CancelButton";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import LocationInput from "./LocationInput";
import SaveButton from "./SaveButton";
import UserNameInput from "./UserNameInput";
import { UserData } from "../../../../../types/socket.io";
import useSubmitUserData from "hooks/useSubmitUserData";
import PersonalWebsiteURLInput from "./PersonalWebsiteURLInput";

type Props = {
	userData: UserData | null;
};

export default function ProfileEditForm({ userData }: Props) {
	const [userName, setUserName] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [websiteURL, setWebsiteURL] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [bio, setBio] = useState<string>("");
	const [avatarImage, setAvatarImage] = useState<string>("");
	const [backgroundImage, setBackgroundImage] = useState<string>("");
	const { submitUserData, isLoading, submitError } = useSubmitUserData();
	const [howManyWasClicked, setHowManyWasClicked] = useState<number>(0);

	useEffect(() => {
		if (userData) {
			setUserName(userData.username);
			setFirstName(userData.firstname || "");
			setLastName(userData.lastname || "");
			setWebsiteURL(userData.websiteURL || "");
			setLocation(userData.location || "");
			setBio(userData.bio || "");
			setAvatarImage(userData.avatarImage || "");
			setBackgroundImage(userData.backgroundImage || "");
		}
	}, [userData]);

	const handleSubmit = () => {
		if (!userData) return;

		const newUserData: UserData = {
			id: userData.id,
			username: userName,
			firstname: firstName,
			lastname: lastName,
			bio: bio,
			websiteURL: websiteURL,
			location: location,
			avatarImage: avatarImage,
			backgroundImage: backgroundImage,
		};

		submitUserData(newUserData);
		setHowManyWasClicked((prev) => prev + 1);
	};

	const disabled = howManyWasClicked > 0;
	return (
		<form
			className="flex flex-col w-full px-10 pt-24 pb-10 space-y-4 bg-white h-fit "
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div className="flex w-full gap-12">
				<UserNameInput userName={userName} setUserName={setUserName} />
				<div className="flex gap-8 w-[60%]">
					<FirstNameInput
						disabled={disabled}
						firstName={firstName}
						setFirstName={setFirstName}
					/>
					<LastNameInput
						disabled={disabled}
						lastName={lastName}
						setLastName={setLastName}
					/>
				</div>
			</div>
			<div className="flex w-full gap-12">
				<PersonalWebsiteURLInput
					disabled={disabled}
					websiteURL={websiteURL}
					setWebsiteURL={setWebsiteURL}
				/>
				<LocationInput
					disabled={disabled}
					location={location}
					setLocation={setLocation}
				/>
			</div>
			<Bio disabled={disabled} bio={bio} setBio={setBio} />
			<div className="flex gap-8 w-[50%]">
				<SaveButton
					howManyWasClicked={howManyWasClicked}
					isLoading={isLoading}
				/>
				<CancelButton />
			</div>
			{submitError && !isLoading && (
				<p className="py-2 text-red-500"> {submitError}</p>
			)}
		</form>
	);
}
