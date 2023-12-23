import useVerifyRefreshToken from "hooks/useVerifyRefreshToken";
import Form from "./Form";
import Header from "./Header";
import socialmedia from "@assets/socialmedia.png";
import { Navigate } from "react-router-dom";
import useAccessToken from "hooks/useAccessToken";
import { AxiosError } from "axios";

const LoginPage = () => {
	const { setAccessToken } = useAccessToken();
	const { data, error, isLoading } = useVerifyRefreshToken();

	if (isLoading)
		return (
			<div className="grid w-full h-full place-items-center">Loading...</div>
		);

	if (!isLoading && !error && data) {
		const { accessToken } = data.data;

		if (accessToken && typeof accessToken === "string") {
			setAccessToken(accessToken);
			return <Navigate to="/" replace />;
		}
	}

	if (error instanceof AxiosError) console.log(error.message);

	return (
		<main className="flex w-full h-full bg-zinc-100">
			<section className="flex flex-col justify-center w-full md:h-full h-[calc(100%-75px)]  p-10 ">
				<Header />
				<Form />
			</section>
			<img className="hidden lg:inline" src={socialmedia} alt="socialmedia" />
		</main>
	);
};
export default LoginPage;
