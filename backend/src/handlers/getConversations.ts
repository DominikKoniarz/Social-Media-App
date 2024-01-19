import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	Conversation,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";

const prisma = getDbInstance();

const getConversations = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("getConversations", async (sendConversations) => {
		const userId = socket.data.userId;

		// shouldn't happen bc of the middleware which always set the userId
		if (!userId) return socket.disconnect();

		try {
			const foundUser = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
				},
			});

			if (!foundUser) return socket.disconnect();

			const rawConversations = await prisma.conversation.findMany({
				where: {
					OR: [{ user1Id: userId }, { user2Id: userId }],
				},
				select: {
					id: true,
					user1: {
						select: {
							id: true,
							username: true,
							firstname: true,
							lastname: true,
							avatarImage: true,
						},
					},
					user2: {
						select: {
							id: true,
							username: true,
							firstname: true,
							lastname: true,
							avatarImage: true,
						},
					},
					messages: {
						take: 10,
						orderBy: {
							createdAt: "desc",
						},
						select: {
							id: true,
							textContent: true,
							createdAt: true,
							receiverId: true,
							senderId: true,
						},
					},
				},
			});

			const conversations: Conversation[] = rawConversations.map(
				(conversation) => {
					return {
						id: conversation.id,
						otherUserId:
							conversation.user1.id === foundUser.id
								? conversation.user2.id
								: conversation.user1.id,
						otherUserUsername:
							conversation.user1.id === foundUser.id
								? conversation.user2.username
								: conversation.user1.username,
						otherUserFirstname:
							conversation.user1.id === foundUser.id
								? conversation.user2.firstname
								: conversation.user1.firstname,
						otherUserLastname:
							conversation.user1.id === foundUser.id
								? conversation.user2.lastname
								: conversation.user1.lastname,
						otherUserAvatarImage:
							conversation.user1.id === foundUser.id
								? conversation.user2.avatarImage
								: conversation.user1.avatarImage,
						messages: [
							...conversation.messages.map((message) => {
								return {
									id: message.id,
									textContent: message.textContent,
									createdAt: message.createdAt.toISOString(),
									senderId: message.senderId,
									receiverId: message.receiverId,
								};
							}),
						],
					};
				}
			);

			sendConversations(null, conversations);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendConversations(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null
			);

			logError(
				`Get user conversations error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getConversations;
