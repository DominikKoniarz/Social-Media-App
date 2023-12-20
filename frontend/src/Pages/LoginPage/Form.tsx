import { useState } from "react";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import LogInButton from "./LogInButton";

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  return (
    <form
      className="space-y-4   w-[400px] mx-auto  my-auto"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className="text-black text-4xl  font-semibold text-center leading-[44px]">
        Welcome Back
      </h1>
      <h2 className="text-black block pb-1 text-lg font-normal text-center  leading-[29.16px]">
        Log in into your account
      </h2>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput pwd={pwd} setPwd={setPwd} />
      <LogInButton />
    </form>
  );
};
export default Form;
