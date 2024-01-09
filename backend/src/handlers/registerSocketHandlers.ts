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
import deleteAvatarImage from "./deleteAvatarImage";
import saveBackgroundImage from "./saveBackgroundImage";
import deleteBackgroundImage from "./deleteBackgroundImage";
import addPost from "./addPost";
import getCurrentUserPosts from "./getCurrentUserPosts";
import searchUsers from "./searchUsers";

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
		deleteAvatarImage(socket);
		saveBackgroundImage(socket);
		deleteBackgroundImage(socket);
		addPost(socket);
		getCurrentUserPosts(socket);
		searchUsers(socket);

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id);
		});
	});
};

export default registerSocketHandlers;
