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
import getFoundUserData from "./getFoundUserData";
import getConversations from "./getConversations";
import createNewConversation from "./createNewConversation";
import sendMessage from "./sendMessage";
import deletePost from "./deletePost";

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
		getFoundUserData(socket);
		deletePost(socket);
		getConversations(socket);
		createNewConversation(socket);
		sendMessage(socket, io);

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id);
		});
	});
};

export default registerSocketHandlers;
