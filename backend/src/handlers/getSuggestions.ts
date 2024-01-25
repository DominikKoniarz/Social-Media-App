import { Socket } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	Suggestion,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";

const prisma = getDbInstance();

const getSuggestions = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("getSuggestions", async (sendSuggestions) => {
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

			const suggestions = (await prisma.user.findMany({
				where: {
					AND: [
						{
							backgroundImage: {
								not: null,
							},
						},
						{
							avatarImage: {
								not: null,
							},
						},
						{
							id: {
								not: userId,
							},
						},
					],
				},
				select: {
					id: true,
					username: true,
					email: true,
					avatarImage: true,
					backgroundImage: true,
				},
				take: 5,
			})) as Suggestion[];

			sendSuggestions(null, suggestions);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendSuggestions(
				process.env.NODE_ENV === "production" ? "Server error!" : errorMessage,
				null
			);

			logError(
				`Get suggestions error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default getSuggestions;
