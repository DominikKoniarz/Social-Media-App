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

const getUserAvatarDir = (userId: string): string =>
	path.join(MEDIA_DIR, userId, "avatar");

const saveAvatarImage = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("deleteAvatarImage", async (sendError) => {
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

			const avatarImageName = foundUser.avatarImage;

			if (!avatarImageName) throw new Error("No image to delete");

			await prisma.user.update({
				data: {
					avatarImage: null,
				},
				where: {
					id: userId,
				},
			});

			const avatarDir = getUserAvatarDir(userId);
			const avatarImage = path.join(avatarDir, avatarImageName);
			await fsp.rm(avatarImage, { force: true });

			sendError(null);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendError(errorMessage);

			socket.emit("serverError", errorMessage);

			logError(
				`Deleting user avatar error! Socket id: ${socket.id}`,
				errorMessage,
				"socketErrorsLog.txt"
			);
		}
	});
};

export default saveAvatarImage;
