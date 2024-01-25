import { useState } from "react";
import SignUpButton from "./SignUpButton";
import InfoText from "./InfoText";
import { REGISTER_URL } from "../../constraints";
import UsernameInput from "@components/UsernameInput";
import EmailInput from "@components/EmailInput";
import PasswordInput from "@components/PasswordInput";
import ErrorDisplay from "./ErrorDisplay";

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
			className="space-y-3 w-full xs:w-4/5 sm:w-3/5 md:w-[400px] mx-auto my-auto"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(password, email, username);
			}}
		>
			<h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold text-center leading-[44px]">
				Create Your Account
			</h1>
			<h2 className="text-black block pb-1 text-lg font-normal text-center leading-[29.16px]">
				Keep up with your friends!
			</h2>
			<UsernameInput username={username} setUsername={setUsername} />
			<EmailInput email={email} setEmail={setEmail} />
			<PasswordInput pwd={password} setPwd={setPassword} />
			<InfoText />
			<SignUpButton isLoading={isLoading} />
			{fetchStatus && <ErrorDisplay fetchStatus={fetchStatus} />}
		</form>
	);
};
export default Form;
