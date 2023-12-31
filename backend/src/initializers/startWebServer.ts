import connectDb from "./connectDb";
import http from "http";
import startSocketIOServer from "./startSocketIOServer";
import createRequiredDirs from "../utils/createRequiredDirs";

const startWebServer = async (
	server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
	// First create required dirs
	await createRequiredDirs();

	// Connect db before starting server
	await connectDb();

	const PORT = process.env.PORT || "3000";

	server.listen(PORT, () => {
		console.log(`Web server started at port ${PORT}`);

		// Start socket.io server after web server started
		startSocketIOServer(server);
	});
};

export default startWebServer;
