import type { Express } from "express";
import connectDb from "./connectDb";

const startWebServer = async (app: Express) => {
	// Connect db before starting server
	await connectDb();

	const PORT = process.env.PORT || "3000";

	app.listen(PORT, () => {
		console.log(`Server started at port ${PORT}`);
	});
};

export default startWebServer;
