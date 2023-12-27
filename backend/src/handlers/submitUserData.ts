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

const getUserData = (
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
			callback(
				error instanceof Error ? error : new Error("Unknown server error!")
			);
			logError(
				`Submit user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getUserData;
