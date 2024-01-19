import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	UserData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";

const prisma = getDbInstance();

const validateUserData = (
	userData: Pick<
		UserData,
		"bio" | "firstname" | "lastname" | "location" | "websiteURL"
	>
): Error | null => {
	if (typeof userData.firstname === "string" && userData.firstname.length > 256)
		return new Error("Firstname is too long! Max 256 characters!");

	if (typeof userData.lastname === "string" && userData.lastname.length > 256)
		return new Error("Lastname is too long! Max 256 characters!");

	if (typeof userData.bio === "string" && userData.bio.length > 16384)
		return new Error("Bio is too long! Max 16384 characters!");

	if (
		typeof userData.websiteURL === "string" &&
		userData.websiteURL.length > 256
	)
		return new Error("Website URL is too long! Max 256 characters!");

	if (typeof userData.location === "string" && userData.location.length > 256)
		return new Error("Location is too long! Max 256 characters!");

	return null;
};

const submitUserData = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("submitUserData", async (userData, callback) => {
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

			const validationResult = validateUserData(userData);
			if (validationResult) return callback(validationResult.message);

			await prisma.user.update({
				data: {
					firstname: userData.firstname,
					lastname: userData.lastname,
					bio: userData.bio,
					websiteURL: userData.websiteURL,
					location: userData.location,
				},
				where: {
					id: foundUser.id,
				},
			});

			callback(null);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";
			callback(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage
			);
			logError(
				`Submit user data error! Socket id: ${socket.id}`,
				errorMessage,
				"socketErrorsLog.txt"
			);
		}
	});
};

export default submitUserData;
