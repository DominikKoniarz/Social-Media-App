import path from "path";
import getDbInstance from "../initializers/db";
import { MEDIA_DIR } from "../utils/createRequiredDirs";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import { Socket } from "socket.io";
import { logError } from "../middleware/errorHandler";
import fsp from "fs/promises";

const prisma = getDbInstance();

const getUserBackgroundDir = (userId: string): string =>
	path.join(MEDIA_DIR, userId, "background");

const deleteBackgroundImage = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("deleteBackgroundImage", async (sendError) => {
		const userId = socket.data.userId;

		// shouldn't happen bc of the middleware which always set the userId
		if (!userId) return socket.disconnect();

		try {
			const foundUser = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!foundUser) return socket.disconnect();

			const backgroundImageName = foundUser.backgroundImage;

			if (!backgroundImageName) throw new Error("No image to delete");

			await prisma.user.update({
				data: {
					backgroundImage: null,
				},
				where: {
					id: userId,
				},
			});

			const backgroundDir = getUserBackgroundDir(userId);
			const backgroundImage = path.join(backgroundDir, backgroundImageName);
			await fsp.rm(backgroundImage, { force: true });

			sendError(null);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendError(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage
			);

			logError(
				`Deleting user background image error! Socket id: ${socket.id}`,
				errorMessage,
				"socketErrorsLog.txt"
			);
		}
	});
};

export default deleteBackgroundImage;
