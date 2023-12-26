type Props = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

const UserNameInput = ({ userName, setUserName }: Props) => {
  return (
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
  );
};
export default UserNameInput;
