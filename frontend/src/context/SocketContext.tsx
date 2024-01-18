import { APP_URL } from "constraints";
import useAuthContext from "hooks/useAuthContext";
import { ReactElement, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import {
	ClientToServerEvents,
	Conversation,
	ServerToClientEvents,
	UserData,
} from "../../../types/socket.io";

type SocketContextType = {
	userData: UserData | null;
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
	socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
	conversations: Conversation[];
	setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
	isLoadingConversations: boolean;
	conversationsError: string | null;
};

const initContextState: SocketContextType = {
	userData: null,
	setUserData: () => {},
	socket: null,
	conversations: [],
	setConversations: () => {},
	isLoadingConversations: true,
	conversationsError: null,
};

const SocketContext = createContext<SocketContextType>(initContextState);

export const SocketContextProvider = ({
	children,
}: {
	children: ReactElement;
}): ReactElement => {
	const { accessToken, refetchVerifyRefreshToken } = useAuthContext();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [isLoadingConversations, setIsLoadingConversations] =
		useState<boolean>(true);
	const [conversationsError, setConversationsError] = useState<string | null>(
		null
	);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);

	const getUserData = (
		socket: Socket<ServerToClientEvents, ClientToServerEvents>
	) => {
		socket.emit("getUserData", (userData) => {
			setUserData(userData);
		});
	};

	const getConversations = (
		socket: Socket<ServerToClientEvents, ClientToServerEvents>
	) => {
		socket.emit("getConversations", (error, conversations) => {
			setIsLoadingConversations(false);

			if (error) {
				setConversationsError(error);
				import.meta.env.DEV && console.log(error);
				return;
			}

			if (conversations) setConversations(conversations);
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
			getConversations(newSocket);
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
				conversations,
				setConversations,
				isLoadingConversations,
				conversationsError,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
