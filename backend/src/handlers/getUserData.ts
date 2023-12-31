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

const getUserData = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("getUserData", async (sendUserData) => {
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

			const userData: UserData = {
				id: foundUser.id,
				username: foundUser.username,
				firstname: foundUser.firstname,
				lastname: foundUser.lastname,
				bio: foundUser.bio,
				websiteURL: foundUser.websiteURL,
				location: foundUser.location,
				avatarImage: foundUser.avatarImage,
				backgroundImage: foundUser.backgroundImage,
			};

			sendUserData(userData);
		} catch (error) {
			sendUserData(null);
			socket.emit(
				"serverError",
				error instanceof Error ? error.message : "Unknown server error!"
			);
			logError(
				`Get user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getUserData;
