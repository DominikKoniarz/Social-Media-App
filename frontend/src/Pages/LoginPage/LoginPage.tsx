import Form from "./Form";
import Header from "./Header";
import socialmedia from "@assets/images/socialmedia.png";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";

const LoginPage = () => {
	const { pathname } = useLocation();
	const { accessToken, firstEnteredPathName } = useAuthContext();

	if (accessToken) {
		if (firstEnteredPathName === pathname) {
			return <Navigate to="/" replace />;
		}

		return <Navigate to={firstEnteredPathName || "/"} replace />;
	}

	return (
		<main className="flex w-full h-full bg-zinc-100">
			<section className="flex flex-col justify-center w-full md:h-full h-[calc(100%-75px)] p-7 sm:p-10">
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
export default LoginPage;
