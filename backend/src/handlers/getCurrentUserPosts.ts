import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";

const prisma = getDbInstance();

const getCurrentUserPosts = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("getCurrentUserPosts", async (offset, sendPosts) => {
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

			if (offset < 0) throw new Error("Offset must be greater or equal 0!");

			const [posts, allPostsCount] = await Promise.all([
				prisma.post.findMany({
					where: {
						userId: userId,
					},
					select: {
						id: true,
						textContent: true,
						publishedAt: true,
						image: true,
					},
					skip: offset,
					take: 7,
				}),
				prisma.post.count({
					where: {
						userId: userId,
					},
				}),
			]);

			sendPosts(null, posts, allPostsCount);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendPosts(errorMessage, null, null);

			logError(
				`Get user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getCurrentUserPosts;
