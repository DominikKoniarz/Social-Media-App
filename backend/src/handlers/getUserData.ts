import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	UserData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";

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

		const foundUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!foundUser) return socket.disconnect();

		const userData: UserData = {
			username: foundUser.username,
			firstname: foundUser.firstname,
			lastname: foundUser.lastname,
			bio: foundUser.bio,
			websiteURL: foundUser.websiteURL,
			location: foundUser.location,
		};

		sendUserData(userData);
	});
};

export default getUserData;
