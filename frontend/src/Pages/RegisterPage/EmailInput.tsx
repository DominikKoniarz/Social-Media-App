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
        className="w-full p-6 my-auto text-base border border-none rounded-lg h-fit"
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
