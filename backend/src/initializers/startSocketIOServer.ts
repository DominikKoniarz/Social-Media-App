import http from "http";
import { Server } from "socket.io";
import { originsWhitelist } from "../config/originsWhitelist";
import { verifyAccessToken } from "../lib/jwt";

const registerMiddlewares = (io: Server) => {
	io.use((socket, next) => {
		const { accessToken } = socket.handshake.auth;

		console.log(accessToken);

		if (!accessToken || typeof accessToken !== "string")
			return next(new Error("Not authorized! Token reduired!"));

		const decoded = verifyAccessToken(accessToken);
		if (!decoded) return next(new Error("Not authorized! Invalid token!"));

		next();
	});
};

const registerHandlers = (io: Server) => {
	io.on("connection", (socket) => {
		console.log("a user connected");

		socket.on("message", (msg) => {
			console.log(msg);
		});

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id);
		});
	});
};

const startSocketIOServer = (
	server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
	const io = new Server(server, {
		cors: {
			origin: originsWhitelist,
			credentials: true,
		},
	});

	console.log("Socket.io server started");

	registerMiddlewares(io);
	registerHandlers(io);
};

export default startSocketIOServer;
