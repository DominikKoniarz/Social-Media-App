import { useState } from "react";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import LogInButton from "./LogInButton";
import { LOGIN_URL } from "../../constraints";
import { useNavigate } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";
import ErrorDisplay from "./ErrorDisplay";

type LoginData = {
	email: string;
	password: string;
};

type ErrorResponse = {
	message: string;
};

const Form = () => {
	const { setAccessToken } = useAuthContext();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchStatus, setFetchStatus] = useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = async (email: string, password: string) => {
		try {
			const data: LoginData = { email, password };

			setFetchStatus("");
			setIsLoading(true);

			const response = await fetch(LOGIN_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const json = (await response.json()) as ErrorResponse;

				throw new Error(`${json.message}`);
			}

			const json = await response.json();
			const accessToken = json.accessToken as string;

			setAccessToken(accessToken);

			navigate("/");
			setFetchStatus("Logged in succesfully!");
		} catch (err: Error | unknown) {
			if (err instanceof Error) {
				setFetchStatus(err.message);
				console.log(err.message);
			} else {
				console.log(err);
			}
			setPassword("");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="space-y-4 w-full xs:w-4/5 sm:w-3/5 md:w-[400px] mx-auto my-auto"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(email, password);
			}}
		>
			<h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold text-center leading-[44px]">
				Welcome Back
			</h1>
			<h2 className="text-black block pb-1 text-base md:text-lg font-normal text-center leading-[29.16px]">
				Log in into your account
			</h2>
			<EmailInput email={email} setEmail={setEmail} />
			<PasswordInput pwd={password} setPwd={setPassword} />
			<LogInButton isLoading={isLoading} />
			{fetchStatus && <ErrorDisplay fetchStatus={fetchStatus} />}
		</form>
	);
};
export default Form;
