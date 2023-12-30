import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";
import Header from "./Header";
import NavBar from "./NavBar";
import { SocketContextProvider } from "context/SocketContext";

const ProtectedRoutesLayout = () => {
  const { accessToken } = useAuthContext();

  if (!accessToken) return <Navigate to="/login" replace />;

  return (
    <SocketContextProvider>
      <div className="w-full h-full bg-zinc-100">
        <main className="w-full h-full  max-w-[1920px] mx-auto">
          <Header />
          <div className="relative flex justify-start h-[calc(100%-74px)] px-20 py-4">
            <NavBar />
            <Outlet />
          </div>
        </main>
      </div>
    </SocketContextProvider>
  );
};

export default ProtectedRoutesLayout;
