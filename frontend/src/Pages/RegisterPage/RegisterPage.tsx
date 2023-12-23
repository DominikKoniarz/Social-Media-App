import Form from "./Form";
import Header from "./Header";
import socialmedia from "@assets/socialmedia.png";
import { AxiosError } from "axios";
import useAccessToken from "hooks/useAccessToken";
import useVerifyRefreshToken from "hooks/useVerifyRefreshToken";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
	const { setAccessToken } = useAccessToken();
	const { data, error, isLoading } = useVerifyRefreshToken();

	if (isLoading)
		return (
			<div className="grid w-full h-full place-items-center">Loading...</div>
		);

	if (!isLoading && data) {
		const { accessToken } = data.data;

		if (accessToken && typeof accessToken === "string") {
			setAccessToken(accessToken);
			return <Navigate to="/" replace />;
		}
	}

	if (error instanceof AxiosError) console.log(error.message);

	return (
		<main className="flex w-screen h-screen bg-zinc-100">
			<section className="flex flex-col w-full md:h-full p-10 h-[calc(100%-75px)] ">
				<Header />
				<Form />
			</section>
			<img className="hidden lg:inline" src={socialmedia} alt="socialmedia" />
		</main>
	);
};
export default RegisterPage;
