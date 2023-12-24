import useAuthContext from "hooks/useAuthContext";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
	const { isTokenBeingVerified } = useAuthContext();

	if (isTokenBeingVerified) return <div>Loading...</div>;

	return <Outlet />;
}
