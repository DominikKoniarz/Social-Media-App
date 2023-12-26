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
      <form className="flex flex-col w-full px-10 pt-24 pb-10 space-y-4 bg-white h-fit ">
        <div className="flex w-full gap-12">
          <UserNameInput userName={userName} setUserName={setUserName} />
          <div className="flex gap-8 w-[60%]">
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
            <LastNameInput lastName={lastName} setLastName={setLastName} />
          </div>
        </div>
        <div className="">
          <p className="py-1">About me</p>
          <label
            htmlFor="UserName-input"
            className=" hidden absolute left-[-9999px]"
          >
            About me
          </label>
          <textarea
            id="About me"
            className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
          />
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
