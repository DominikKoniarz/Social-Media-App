import { useState } from "react";
import EmailInput from "./EmailInput";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import SignUpButton from "./SignUpButton";

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  return (
    <form
      className="space-y-4 gap-3 h-[618px] w-[400px] mx-auto  mt-20"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="text-black text-4xl font-semibold text-center leading-[44px]">
        Create Your Accout
      </div>
      <NameInput name={name} setName={setName} />
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput pwd={pwd} setPwd={setPwd} />
      <SignUpButton />
    </form>
  );
};
export default Form;
