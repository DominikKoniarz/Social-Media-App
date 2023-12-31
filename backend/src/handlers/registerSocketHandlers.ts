import { Server } from "socket.io";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "../../../types/socket.io";
import getUserData from "./getUserData";
import submitUserData from "./submitUserData";
import saveAvatarImage from "./saveAvatarImage";

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
		submitUserData(socket);
		saveAvatarImage(socket);

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id);
		});
	});
};

export default registerSocketHandlers;
