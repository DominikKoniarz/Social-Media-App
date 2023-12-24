import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";
import Header from "./Header";
import NavBar from "./NavBar";

const ProtectedRoutesLayout = () => {
	const { accessToken } = useAuthContext();

	if (!accessToken) return <Navigate to="/login" replace />;

	return (
		<main className="w-full h-full bg-zinc-100 max-w-[1920px] mx-auto">
			<Header />
			<div className="relative flex justify-start h-[calc(100%-74px)] p-4">
				<NavBar />
				<Outlet />
			</div>
		</main>
	);
};

export default ProtectedRoutesLayout;
