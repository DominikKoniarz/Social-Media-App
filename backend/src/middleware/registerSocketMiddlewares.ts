import { Server } from "socket.io";
import { verifyAccessToken } from "../lib/jwt";
import { logError } from "./errorHandler";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";

const registerMiddlewares = async (
	io: Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	io.use((socket, next) => {
		const { accessToken } = socket.handshake.auth;

		if (!accessToken || typeof accessToken !== "string")
			return next(new Error("Not authorized! Token reduired!"));

		try {
			const decoded = verifyAccessToken(accessToken);
			if (!decoded) return next(new Error("Not authorized! Invalid token!"));

			socket.data.userId = decoded.userId;
		} catch (error) {
			if (process.env.NODE_ENV !== "production")
				console.log(error instanceof Error ? error.message : error);

			logError(
				`Socket auth unknown error! Socket id: ${socket.id}`,
				error instanceof Error ? error.message : "unknown error",
				"socketErrorsLog.txt"
			);
			return next(new Error("Auth Error!"));
		}

		next();
	});
};

export default registerMiddlewares;
