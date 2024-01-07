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
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
	socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
};

const initContextState: SocketContextType = {
	userData: null,
	setUserData: () => {},
	socket: null,
};

const SocketContext = createContext<SocketContextType>(initContextState);

export const SocketContextProvider = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const { accessToken, refetchVerifyRefreshToken } = useAuthContext();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);

	const getUserData = (
		socket: Socket<ServerToClientEvents, ClientToServerEvents>
	) => {
		socket.emit("getUserData", (userData) => {
			setUserData(userData);
		});
	};

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
			console.log("connected");
			getUserData(newSocket);
		});

		newSocket.on("disconnect", () => {
			console.log("Server dissconnected");
			refetchVerifyRefreshToken();
		});

		newSocket.on("connect_error", (error) => {
			console.log(`Connecting error: ${error.message}`);
			refetchVerifyRefreshToken();
		});

		newSocket.on("serverError", (msg) => {
			console.log(msg);
		});

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [accessToken, refetchVerifyRefreshToken]);

	return (
		<SocketContext.Provider
			value={{
				userData,
				socket,
				setUserData,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
