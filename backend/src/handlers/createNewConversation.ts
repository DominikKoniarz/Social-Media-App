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

const createNewConversation = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("createNewConversation", async (otherUserId, message, callback) => {
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

			const [foundOtherUser, foundConversation] = await Promise.all([
				prisma.user.findUnique({
					where: {
						id: otherUserId,
					},
					select: {
						id: true,
						username: true,
						firstname: true,
						lastname: true,
						avatarImage: true,
					},
				}),
				prisma.conversation.findFirst({
					where: {
						OR: [
							{
								user1Id: userId,
								user2Id: otherUserId,
							},
							{
								user1Id: otherUserId,
								user2Id: userId,
							},
						],
					},
				}),
			]);

			if (foundConversation) throw new Error("Conversation already exists! ");
			if (!foundOtherUser) throw new Error("Specified user dosen't exist!");

			const newConversation = await prisma.conversation.create({
				data: {
					user1Id: userId,
					user2Id: otherUserId,
					messages: {
						create: {
							textContent: message,
							senderId: userId,
							receiverId: otherUserId,
						},
					},
				},
				select: {
					messages: true,
					id: true,
				},
			});

			const conversation: Conversation = {
				id: newConversation.id,
				otherUserId: otherUserId,
				otherUserUsername: foundOtherUser.username,
				otherUserFirstname: foundOtherUser.firstname,
				otherUserLastname: foundOtherUser.lastname,
				otherUserAvatarImage: foundOtherUser.avatarImage,
				messages: newConversation.messages.map((message) => ({
					id: message.id,
					textContent: message.textContent,
					createdAt: message.createdAt.toISOString(),
					senderId: message.senderId,
					receiverId: message.receiverId,
				})),
			};

			callback(null, conversation);
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

export default createNewConversation;
