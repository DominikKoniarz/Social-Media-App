import http from "http";
import { Server } from "socket.io";
import { originsWhitelist } from "../config/originsWhitelist";
import registerMiddlewares from "../middleware/registerSocketMiddlewares";
import registerSocketHandlers from "../handlers/registerSocketHandlers";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";

const startSocketIOServer = (
	server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
	const io = new Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>(server, {
		cors: {
			origin: originsWhitelist,
			credentials: true,
		},
		maxHttpBufferSize: 7000000,
	});

	console.log("Socket.io server started");

	registerMiddlewares(io);
	registerSocketHandlers(io);
};

export default startSocketIOServer;
