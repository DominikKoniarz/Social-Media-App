import { useState } from "react";
import UserNameInput from "./UserNameInput";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import ProfileEditHeader from "./ProfileEditHeader";
import WebsiteUrlInput from "./WebsiteUrlInput";
import LocationInput from "./LocationInput";
import Bio from "./Bio";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";

const ProfileEdit = () => {
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  return (
    <div className="w-full h-full px-6">
      <ProfileEditHeader />
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
          <WebsiteUrlInput
            websiteUrl={websiteUrl}
            setWebsiteUrl={setWebsiteUrl}
          />
          <LocationInput location={location} setLocation={setLocation} />
        </div>
        <Bio bio={bio} setBio={setBio} />
        <div className="flex gap-8 w-[50%]">
          <SaveButton />
          <CancelButton />
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
