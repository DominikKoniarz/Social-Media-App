import Form from "./Form";
import Header from "./Header";
import socialmedia from "@assets/images/socialmedia.png";
import useAuthContext from "hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
	const { accessToken } = useAuthContext();

	if (accessToken) return <Navigate to="/" replace />;

	return (
		<main className="flex w-screen h-screen bg-zinc-100">
			<section className="flex flex-col w-full md:h-full p-7 sm:p-10 h-[calc(100%-75px)] ">
				<Header />
				<Form />
			</section>
			<div className="hidden lg:block h-full w-[500px] xl:w-[600px] shrink-0">
				<img
					className="object-cover w-full h-full"
					src={socialmedia}
					alt="socialmedia"
				/>
			</div>
		</main>
	);
};
export default RegisterPage;
