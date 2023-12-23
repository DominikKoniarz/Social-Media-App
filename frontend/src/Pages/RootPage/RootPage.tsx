import { Navigate } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import useAccessToken from "hooks/useAccessToken";

const RootPage = () => {
	const { getAccessToken } = useAccessToken();
	const accessToken = getAccessToken();

	if (!accessToken) return <Navigate to="/login" replace />;

	return (
		<div className="w-full h-full p-0">
			<Header />
			<main className="relative flex h-[calc(100%-74px)] p-4 px-16 pb-0 bg-zinc-100">
				<NavBar />
			</main>
		</div>
	);
};
export default RootPage;
