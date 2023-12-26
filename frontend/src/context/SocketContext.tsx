import { APP_URL } from "constraints";
import useAuthContext from "hooks/useAuthContext";
import { ReactElement, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import {
	ClientToServerEvents,
	ServerToClientEvents,
	UserData,
} from "../../../types/socket.io";

type SocketContextType = {
	userData: UserData | null;
};

const initContextState: SocketContextType = {
	userData: null,
};

const SocketContext = createContext<SocketContextType>(initContextState);

export const SocketContextProvider = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const { accessToken } = useAuthContext();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
			APP_URL,
			{
				auth: {
					accessToken: accessToken,
				},
			}
		);

		newSocket.on("connect", () => {
			newSocket.emit("getUserData", (userData) => {
				console.log(userData);
				setUserData(userData);
			});
		});

		newSocket.on("disconnect", () => {
			console.log(newSocket.disconnected);
		});

		newSocket.on("connect_error", () => {
			console.log("connect error");
		});

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [accessToken]);

	return (
		<SocketContext.Provider
			value={{
				userData,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
