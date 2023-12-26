import ProfileBackground from "@assets/images/ProfileBackground.png";
import ProfilePicture from "@assets/images/ProfilePicture.png";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";

const ProfileEdit = () => {
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  return (
    <div className="w-full h-full px-6">
      <div className="relative flex flex-col w-full h-fit">
        <img src={ProfileBackground} alt="ProfileBackground" />
        <button
          type="button"
          className="absolute p-3 text-lg font-normal capitalize bg-white right-6 top-6 text-zinc-950 family1"
        >
          Change Image
        </button>

        <button className="absolute rounded-md left-10 top-56">
          <div className="relative w-full h-full">
            <div className="absolute flex items-center justify-center w-full h-full text-xl text-white transition-all duration-300 rounded-md opacity-0 hover:opacity-50 hover:bg-black">
              <FaPen />
            </div>
            <img
              className="w-full h-full rounded-md asbolute"
              src={ProfilePicture}
              alt="ProfilePicture"
            />
          </div>
        </button>
      </div>
      <form className="w-full px-10 pt-24 pb-10 bg-white h-fit ">
        <div className="flex w-full gap-12">
          <div className="flex flex-col w-[40%]">
            <p className="py-1">User Name</p>
            <label
              htmlFor="UserName-input"
              className=" hidden absolute left-[-9999px]"
            >
              UserName
            </label>
            <input
              className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
              type="text"
              placeholder="User Name"
              id="UserName-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex gap-8  w-[60%] ">
            <div className="flex flex-col w-full">
              <p className="py-1">First Name</p>
              <label
                htmlFor="FirstName-input"
                className=" hidden absolute left-[-9999px]"
              >
                First Name
              </label>
              <input
                className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
                type="text"
                placeholder="First Name"
                id="FirstName-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="py-1">Last Name</p>
              <label
                htmlFor="LastName-input"
                className=" hidden absolute left-[-9999px]"
              >
                LastName
              </label>
              <input
                className="w-full p-4 border rounded bg-neutral-100 border-neutral-200"
                type="text"
                placeholder="Last Name"
                id="LastName-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
