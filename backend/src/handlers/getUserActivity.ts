import { Server, Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";
import path from "path";
import { MEDIA_DIR } from "../utils/createRequiredDirs";
import createDirIfNotExists from "../lib/createDirIfNotExists";

const prisma = getDbInstance();

const getUserDir = (userId: string): string => path.join(MEDIA_DIR, userId);
const getUserPostsDir = (userId: string): string =>
	path.join(MEDIA_DIR, userId, "posts");

const createRequiredDirs = async (userId: string) => {
	const userDir = getUserDir(userId);
	await createDirIfNotExists(userDir);

	const postsDir = getUserPostsDir(userId);
	await createDirIfNotExists(postsDir);
};

const getUserActivity = (
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
	socket.on("getUserActivity", async (otherUserId, callback) => {
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

			const allSockets = await io.fetchSockets();

			const foundSocket = allSockets.find(
				(socket) => socket.data.userId === otherUserId
			);
			const isOtherUserActive = foundSocket ? true : false;

			callback(null, isOtherUserActive);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			callback(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null
			);

			logError(
				`Get user activity error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getUserActivity;
