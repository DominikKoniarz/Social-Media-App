import Form from "./Form";
import Header from "./Header";
import socialmedia from "@assets/socialmedia.png";
import { Navigate } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";

const LoginPage = () => {
	const { accessToken } = useAuthContext();

	if (accessToken) return <Navigate to="/" replace />;

	return (
		<main className="flex w-full h-full bg-zinc-100">
			<section className="flex flex-col justify-center w-full md:h-full h-[calc(100%-75px)] p-10">
				<Header />
				<Form />
			</section>
			<img className="hidden lg:inline" src={socialmedia} alt="socialmedia" />
		</main>
	);
};
export default LoginPage;
