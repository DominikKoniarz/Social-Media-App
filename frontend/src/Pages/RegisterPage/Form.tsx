import { useState } from "react";
import SignUpButton from "./SignUpButton";
import InfoText from "./InfoText";
import { REGISTER_URL } from "../../constraints";
import UsernameInput from "@components/UsernameInput";
import EmailInput from "@components/EmailInput";
import PasswordInput from "@components/PasswordInput";

type NewUser = {
	email: string;
	username: string;
	password: string;
};

type ErrorResponse = {
	message: string;
};

const Form = () => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchStatus, setFetchStatus] = useState<string>("");
	const handleSubmit = async (
		password: string,
		email: string,
		username: string
	) => {
		try {
			const data: NewUser = { password, email, username };

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

			setEmail("");
			setPassword("");
			setUsername("");
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
				handleSubmit(password, email, username);
			}}
		>
			<h1 className="text-black text-4xl  font-semibold text-center leading-[44px]">
				Create Your Account
			</h1>
			<h2 className="text-black block pb-1 text-lg font-normal text-center  leading-[29.16px]">
				Keep up with your friends!
			</h2>
			<UsernameInput username={username} setUsername={setUsername} />
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
