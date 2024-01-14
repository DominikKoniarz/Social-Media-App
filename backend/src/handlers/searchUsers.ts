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

const searchUsers = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	socket.on("searchUsers", async (searchText, sendData) => {
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

			if (!searchText) throw new Error("Search text cannot be empty!");

			const splitedSearchText = searchText.split(" ");

			const likeSplittedText = splitedSearchText.map((text) => {
				return [
					{ username: { contains: text } },
					{ firstname: { contains: text } },
					{ lastname: { contains: text } },
				];
			});

			const foundUsers = await prisma.user.findMany({
				where: {
					OR: [
						{ username: { in: splitedSearchText } },
						{ firstname: { in: splitedSearchText } },
						{ lastname: { in: splitedSearchText } },
						...likeSplittedText.flat(),
					],
					AND: [{ id: { not: userId } }],
				},
				select: {
					id: true,
					username: true,
					firstname: true,
					lastname: true,
					avatarImage: true,
				},
				take: 8,
			});

			sendData(null, foundUsers);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown server error!";

			sendData(errorMessage, null);

			logError(
				`Get user data error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
		}
	});
};

export default searchUsers;
