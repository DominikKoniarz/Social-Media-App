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
			import.meta.env.DEV && console.log("connected");

			getUserData(newSocket);
			getConversations(newSocket);
		});

		newSocket.on("disconnect", () => {
			import.meta.env.DEV && console.log("Server dissconnected");
			refetchVerifyRefreshToken();
		});

		newSocket.on("connect_error", (error) => {
			import.meta.env.DEV && console.log(`Connecting error: ${error.message}`);
			refetchVerifyRefreshToken();
		});

		newSocket.on("newMessage", (conversationId, newMessage) => {
			setConversations((prevConversations) => {
				if (prevConversations.length === 0) return prevConversations;

				return prevConversations.map((conversation) => {
					if (conversation.id === conversationId) {
						return {
							...conversation,
							messages: [...conversation.messages, newMessage],
						};
					}

					return conversation;
				});
			});
		});

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [accessToken, refetchVerifyRefreshToken]);

	const conversationsSortedByNewestMessage = conversations.sort((a, b) => {
		if (a.messages.length === 0 || b.messages.length === 0) return 0;

		const aNewestMessage = a.messages.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)[0];
		const bNewestMessage = b.messages.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)[0];

		return (
			new Date(bNewestMessage.createdAt).getTime() -
			new Date(aNewestMessage.createdAt).getTime()
		);
	});

	return (
		<SocketContext.Provider
			value={{
				userData,
				socket,
				setUserData,
				conversations: conversationsSortedByNewestMessage,
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
