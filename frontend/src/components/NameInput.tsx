type Props = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const NameInput = ({ name, setName }: Props) => {
  return (
    <>
      <label htmlFor="name-input" className=" hidden absolute left-[-9999px]">
        Name
      </label>
      <input
        required
        className="w-full p-3 my-auto text-base border rounded-lg md:p-6 border-zinc-300 h-fit"
        placeholder="Name"
        id="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
};
export default NameInput;
