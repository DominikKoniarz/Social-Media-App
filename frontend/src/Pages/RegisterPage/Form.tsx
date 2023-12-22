import { useState } from "react";
import NameInput from "../../components/NameInput";
import PasswordInput from "../../components/PasswordInput";
import SignUpButton from "./SignUpButton";
import EmailInput from "../../components/EmailInput";
import InfoText from "./InfoText";
import { REGISTER_URL } from "../../constraints";

type NewUser = {
  email: string;
  name: string;
  password: string;
};

type ErrorResponse = {
  message: string;
};

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<string>("");
  const handleSubmit = async (
    password: string,
    email: string,
    name: string
  ) => {
    try {
      const data: NewUser = { password, email, name };
      setFetchStatus("");
      setIsLoading(true);
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const json = (await response.json()) as ErrorResponse;

        throw new Error(`${json.message}`);
      }

      setFetchStatus("Signed in succesfully!");
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        setFetchStatus(err.message);
        console.log(err.message);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-3 w-full  md:w-[400px] mx-auto  my-auto"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(password, email, name);
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
      <PasswordInput pwd={password} setPwd={setPassword} />
      <InfoText />
      <SignUpButton isLoading={isLoading} />
      {fetchStatus && (
        <p
          className={`${
            fetchStatus === "Signed in succesfully!"
              ? "text-green-500"
              : "text-red-500"
          } pt-1 mx-auto w-fit text-center`}
        >
          {fetchStatus}
        </p>
      )}
    </form>
  );
};
export default Form;
