import { useState } from "react";

import NameInput from "../../components/NameInput";
import PasswordInput from "../../components/PasswordInput";
import SignUpButton from "./SignUpButton";
import EmailInput from "../../components/EmailInput";
import InfoText from "./InfoText";

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  return (
    <form
      className="space-y-4   w-[400px] mx-auto  my-auto"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className="text-black text-4xl  font-semibold text-center leading-[44px]">
        Create Your Account
      </h1>
      <h2 className="text-black block pb-1 text-lg font-normal text-center  leading-[29.16px]">
        Keep up with your friends!
      </h2>
      <NameInput name={name} setName={setName} />
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput pwd={pwd} setPwd={setPwd} />
      <InfoText />
      <SignUpButton />
    </form>
  );
};
export default Form;
