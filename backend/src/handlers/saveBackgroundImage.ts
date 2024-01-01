import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";
import { MEDIA_DIR } from "../utils/createRequiredDirs";
import path from "path";
import createDirIfNotExists from "../lib/createDirIfNotExists";
import sharp from "sharp";
import fsp from "fs/promises";

const prisma = getDbInstance();

const getUserDir = (userId: string): string => path.join(MEDIA_DIR, userId);
const getUserAvatarDir = (userId: string): string =>
	path.join(MEDIA_DIR, userId, "avatar");

const createRequiredDirs = async (userId: string) => {
	const userDir = getUserDir(userId);
	await createDirIfNotExists(userDir);

	const avatarDir = getUserAvatarDir(userId);
	await createDirIfNotExists(avatarDir);
};

const saveBackgroundImage = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on(
		"saveBackgroundImage",
		async (imageBuffer, imageName, cropData, sendImageSrc) => {
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

				// await createRequiredDirs(userId);

				const newImageName = "";

				sendImageSrc(null, newImageName);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown server error!";

				sendImageSrc(errorMessage, null);

				socket.emit("serverError", errorMessage);

				logError(
					`Save user background image error! Socket id: ${socket.id}`,
					errorMessage,
					"socketErrorsLog.txt"
				);
			}
		}
	);
};

export default saveBackgroundImage;
