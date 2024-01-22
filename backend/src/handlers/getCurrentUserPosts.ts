import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	Post,
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
					_count: {
						select: {
							likes: true,
						},
					},
					likes: {
						where: {
							userId: userId,
						},
						select: {
							id: true,
						},
					},
				},
				orderBy: {
					publishedAt: "desc",
				},
			});

			const posts: Post[] = postsRaw.map((post) => ({
				id: post.id,
				textContent: post.textContent,
				image: post.image,
				likes: post._count.likes,
				publishedAt: post.publishedAt.toISOString(),
				isLikedByCurrentUser: post.likes.length > 0,
			}));

			sendPosts(null, posts);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendPosts(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null
			);

			logError(
				`Get user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getCurrentUserPosts;
