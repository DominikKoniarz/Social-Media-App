import { Socket } from "socket.io";
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
import fsp from "fs/promises";
import sharp from "sharp";

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

const addPost = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on(
		"addPost",
		async (textContent, imageBuffer, imageName, releaseDate, sendError) => {
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

				if (!textContent) throw new Error("Text content of post is required!");
				if (textContent.length > 2000)
					throw new Error(
						"Text content of post is too long! Max 2000 characters!"
					);

				if ((imageBuffer && !imageName) || (!imageBuffer && imageName))
					throw new Error(
						"Both image buffer and image name are required if you want to add an image!"
					);

				if (releaseDate && releaseDate < new Date())
					throw new Error("Release date cannot be in the past!");

				const newPost = await prisma.post.create({
					data: {
						textContent,
						publishedAt: releaseDate || new Date(),
						user: {
							connect: {
								id: userId,
							},
						},
					},
				});

				if (imageBuffer && imageName) {
					await createRequiredDirs(userId);

					const imageNameWithoutExtension = path.parse(imageName).name;
					const newImageName = `${imageNameWithoutExtension}.webp`;

					const postsDir = getUserPostsDir(userId);
					const newPostDir = path.join(postsDir, newPost.id);

					await createDirIfNotExists(newPostDir);

					const croppedImageBuffer = await sharp(imageBuffer)
						.resize({
							height: 300,
							width: 630,
							fit: "contain",
						})
						.webp()
						.toBuffer();

					await fsp.writeFile(
						path.join(newPostDir, newImageName),
						croppedImageBuffer
					);

					await prisma.post.update({
						where: {
							id: newPost.id,
						},
						data: {
							image: newImageName,
						},
					});
				}

				sendError(null);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown server error!";

				sendError(errorMessage);

				logError(
					`Get user data error! Socket id: ${socket.id}`,
					error instanceof Error ? error.message : "unknown error",
					"socketErrorsLog.txt"
				);
			}
		}
	);
};

export default addPost;
