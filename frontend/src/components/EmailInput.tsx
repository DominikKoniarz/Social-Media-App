type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const EmailInput = ({ email, setEmail }: Props) => {
  return (
    <>
      <label htmlFor="email-input" className="hidden absolute left-[-9999px]">
        Email
      </label>
      <input
        required
        className="w-full p-3 my-auto text-base border rounded-lg md:p-6 border-zinc-300 h-fit"
        placeholder="Email"
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
};
export default EmailInput;
