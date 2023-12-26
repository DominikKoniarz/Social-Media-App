type Props = {
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
};

const LastNameInput = ({ lastName, setLastName }: Props) => {
  return (
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
  );
};
export default LastNameInput;
