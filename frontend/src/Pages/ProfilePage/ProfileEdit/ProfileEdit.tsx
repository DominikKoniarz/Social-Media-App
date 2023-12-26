import { useState } from "react";
import UserNameInput from "./UserNameInput";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import ProfileEditHeader from "./ProfileEditHeader";

const ProfileEdit = () => {
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  return (
    <div className="w-full h-full px-6">
      <ProfileEditHeader />
      <form className="w-full px-10 pt-24 pb-10 bg-white h-fit ">
        <div className="flex w-full gap-12">
          <UserNameInput userName={userName} setUserName={setUserName} />
          <div className="flex gap-8  w-[60%] ">
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
            <LastNameInput lastName={lastName} setLastName={setLastName} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
