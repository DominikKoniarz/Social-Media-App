import { APP_URL } from "constraints";
import { io } from "socket.io-client";

function getSocket(token: string) {
	return io(APP_URL, {
		withCredentials: true,
		auth: {
			accessToken: token,
		},
	});
}

export default getSocket;
