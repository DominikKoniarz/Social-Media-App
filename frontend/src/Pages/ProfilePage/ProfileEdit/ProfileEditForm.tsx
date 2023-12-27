import { useEffect, useState } from "react";
import Bio from "./Bio";
import CancelButton from "./CancelButton";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import LocationInput from "./LocationInput";
import SaveButton from "./SaveButton";
import UserNameInput from "./UserNameInput";
import WebsiteURLInput from "./WebsiteURLInput";
import { UserData } from "../../../../../types/socket.io";

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
    <form
      className="flex flex-col w-full px-10 pt-24 pb-10 space-y-4 bg-white h-fit "
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex w-full gap-12">
        <UserNameInput userName={userName} setUserName={setUserName} />
        <div className="flex gap-8 w-[60%]">
          <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
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
  );
}
