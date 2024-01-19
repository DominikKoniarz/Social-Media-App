import { Server, Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	UserMessage,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";

const prisma = getDbInstance();

const sendMessage = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>,
	io: Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("sendMessage", async (conversationId, message, callback) => {
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

			if (message.length === 0) throw new Error("Message cannot be empty!");

			if (message.length > 2048)
				throw new Error("Message is too long! Max 2048 characters!");

			const foundConversation = await prisma.conversation.findUnique({
				where: {
					id: conversationId,
				},
				select: {
					id: true,
					user1Id: true,
					user2Id: true,
				},
			});

			if (!foundConversation) throw new Error("Conversation not found!");

			const otherUserId =
				foundConversation.user1Id === userId
					? foundConversation.user2Id
					: foundConversation.user1Id;

			const newMessage = await prisma.message.create({
				data: {
					senderId: userId,
					receiverId: otherUserId,
					textContent: message,
					conversationId: conversationId,
				},
			});

			const mappedMessage: UserMessage = {
				id: newMessage.id,
				textContent: newMessage.textContent,
				createdAt: newMessage.createdAt.toISOString(),
				senderId: newMessage.senderId,
				receiverId: newMessage.receiverId,
			};

			const allSockets = await io.fetchSockets();

			const foundOtherUserSocket = allSockets.find(
				(socket) => socket.data.userId === otherUserId
			);

			if (foundOtherUserSocket)
				foundOtherUserSocket.emit("newMessage", conversationId, mappedMessage);

			callback(null, mappedMessage);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			callback(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null
			);

			logError(
				`Create new conversation error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default sendMessage;
