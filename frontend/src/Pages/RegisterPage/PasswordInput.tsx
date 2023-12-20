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
        className="w-full p-6 my-auto text-base border border-none rounded-lg h-fit"
        placeholder="Password"
        id="pwd-input"
        type="text"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <p className="text-xs font-light leading-normal capitalize text-neutral-500">
        By signing up you agree to our
        <span className="text-teal-500"> Terms of Service </span>and
        <span className="text-teal-500"> Privacy policy</span> and confirm that
        you are at least 18 years old
      </p>
    </>
  );
};
export default PasswordInput;
