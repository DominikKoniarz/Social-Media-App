import { APP_URL } from "constraints";
import useAuthContext from "hooks/useAuthContext";
import { ReactElement, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
	socket: Socket | null;
};

const initContextState: SocketContextType = {
	socket: null,
};

const SocketContext = createContext<SocketContextType>(initContextState);

export const SocketContextProvider = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const { accessToken } = useAuthContext();
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(APP_URL, {
			// withCredentials: true,
			auth: {
				accessToken: accessToken,
			},
		});

		newSocket.on("connect", () => {
			console.log(newSocket.id);
		});

		newSocket.on("disconnect", () => {
			console.log(newSocket.disconnected);
		});

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [accessToken]);

	return (
		<SocketContext.Provider
			value={{
				socket,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
