type Props = {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
};

const FirstNameInput = ({ firstName, setFirstName }: Props) => {
  return (
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
  );
};
export default FirstNameInput;
