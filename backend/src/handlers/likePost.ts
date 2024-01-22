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

const switchPostLike = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("switchPostLike", async (postId, callback) => {
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

			const [foundPost, foundLike] = await Promise.all([
				prisma.post.findUnique({
					where: {
						id: postId,
					},
					select: {
						id: true,
					},
				}),
				prisma.like.findFirst({
					where: {
						postId: postId,
						userId: userId,
					},
					select: {
						id: true,
					},
				}),
			]);

			if (!foundPost) return callback("Post not found!", null);

			if (!foundLike) {
				await prisma.like.create({
					data: {
						userId: userId,
						postId: postId,
					},
				});

				callback(null, true);
			} else {
				await prisma.like.delete({
					where: {
						id: foundLike.id,
					},
				});

				callback(null, false);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			callback(
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

export default switchPostLike;
