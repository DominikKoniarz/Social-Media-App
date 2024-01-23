import Header from "./Header";
import socialmedia from "@assets/images/socialmedia.png";
import useAuthContext from "hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import ServiceInfo from "./ServiceInfo";

const Terms = () => {
	const { accessToken } = useAuthContext();

	if (accessToken) return <Navigate to="/" replace />;

	return (
		<main className="flex w-screen h-screen bg-zinc-100">
			<section className="flex flex-col w-full md:h-full p-10 h-[calc(100%-75px)] ">
				<Header />
				<ServiceInfo />
			</section>
			<img className="hidden lg:inline" src={socialmedia} alt="socialmedia" />
		</main>
	);
};
export default Terms;
