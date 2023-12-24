import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";

const ProtectedRoutes = () => {
	const { accessToken } = useAuthContext();

	if (!accessToken) return <Navigate to="/login" replace />;

	return <Outlet />;
};

export default ProtectedRoutes;
