type Props = {
  pwd: string;
  setPwd: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordInput = ({ pwd, setPwd }: Props) => {
  return (
    <>
      <label htmlFor="pwd-input" className="hidden absolute left-[-9999px]">
        Password
      </label>
      <input
        required
        className="w-full p-3 my-auto text-base border rounded-lg md:p-6 border-zinc-300 h-fit"
        placeholder="Password"
        id="pwd-input"
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
    </>
  );
};
export default PasswordInput;
