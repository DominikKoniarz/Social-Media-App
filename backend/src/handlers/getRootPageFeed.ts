import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	RootPagePost,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";

const prisma = getDbInstance();

const getRootPageFeed = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("getRootPageFeed", async (sendFeed) => {
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

			const rawPosts = await prisma.post.findMany({
				orderBy: {
					publishedAt: "desc",
				},
				where: {
					publishedAt: {
						lte: new Date(),
					},
					userId: {
						notIn: [userId],
					},
				},
				take: 15,
				select: {
					id: true,
					textContent: true,
					image: true,
					publishedAt: true,
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
					user: {
						select: {
							id: true,
							username: true,
							firstname: true,
							lastname: true,
							avatarImage: true,
						},
					},
				},
			});

			const posts: RootPagePost[] = rawPosts.map((rawPost) => {
				return {
					id: rawPost.id,
					textContent: rawPost.textContent,
					likes: rawPost._count.likes,
					image: rawPost.image,
					publishedAt: rawPost.publishedAt.toISOString(),
					authorId: rawPost.user.id,
					authorUsername: rawPost.user.username,
					authorFirstname: rawPost.user.firstname,
					authorLastname: rawPost.user.lastname,
					authorAvatarImage: rawPost.user.avatarImage,
					isLikedByCurrentUser: rawPost.likes.length > 0,
				};
			});

			sendFeed(null, posts);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendFeed(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null
			);

			logError(
				`Get root page feed error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getRootPageFeed;
