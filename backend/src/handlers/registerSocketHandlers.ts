import { Server } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getUserData from "./getUserData";

const registerSocketHandlers = (
	io: Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>
) => {
	io.on("connection", (socket) => {
		getUserData(socket);

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id);
		});
	});
};

export default registerSocketHandlers;
