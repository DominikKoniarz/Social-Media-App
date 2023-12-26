import useAuthContext from "hooks/useAuthContext";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const { isTokenBeingVerified } = useAuthContext();

  if (isTokenBeingVerified)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="loader">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );

  return <Outlet />;
}
