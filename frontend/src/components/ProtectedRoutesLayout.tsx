import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "hooks/useAuthContext";
import Header from "./Header";
import NavBar from "./NavBar";
import { SocketContextProvider } from "context/SocketContext";
import NavBarMobile from "./NavBarMobile";
import { useState } from "react";

const ProtectedRoutesLayout = () => {
  const { accessToken } = useAuthContext();
  const [toggle, setToggle] = useState<boolean>(false);
  if (!accessToken) return <Navigate to="/login" replace />;

  return (
    <SocketContextProvider>
      <div className="w-full h-full bg-zinc-100">
        <main className="w-full h-full  max-w-[1920px] mx-auto">
          <Header toggle={toggle} setToggle={setToggle} />
          <div className="relative flex justify-start h-[calc(100%-74px)] z-20 p-0 md:px-20  md:py-4">
            <NavBar />
            <NavBarMobile toggle={toggle} />
            <Outlet />
          </div>
        </main>
      </div>
    </SocketContextProvider>
  );
};

export default ProtectedRoutesLayout;
