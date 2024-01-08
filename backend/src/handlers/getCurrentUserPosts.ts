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
	socket.on("getCurrentUserPosts", async (sendPosts) => {
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

			const postsRaw = await prisma.post.findMany({
				where: {
					userId: userId,
				},
				select: {
					id: true,
					textContent: true,
					publishedAt: true,
					image: true,
				},
				orderBy: {
					publishedAt: "desc",
				},
			});

			const posts = postsRaw.map((post) => ({
				...post,
				publishedAt: post.publishedAt.toISOString(),
			}));

			sendPosts(null, posts);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendPosts(errorMessage, null);

			logError(
				`Get user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getCurrentUserPosts;
