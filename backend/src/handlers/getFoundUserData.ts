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

const getFoundUserData = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("getFoundUserData", async (id, sendData) => {
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

			const [postsRaw, userData] = await Promise.all([
				prisma.post.findMany({
					where: {
						userId: id,
						publishedAt: {
							lte: new Date(),
						},
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
				}),
				prisma.user.findUnique({
					where: {
						id,
					},
					select: {
						id: true,
						username: true,
						firstname: true,
						lastname: true,
						bio: true,
						websiteURL: true,
						location: true,
						avatarImage: true,
						backgroundImage: true,
					},
				}),
			]);

			const posts = postsRaw.map((post) => ({
				...post,
				publishedAt: post.publishedAt.toISOString(),
			}));

			sendData(null, userData, posts);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendData(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null,
				null
			);

			logError(
				`Get found user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getFoundUserData;
