import type { Express } from "express";

const startWebServer = (app: Express) => {
	const PORT = process.env.PORT || "3000";

	app.listen(PORT, () => {
		console.log(`Server started at port ${PORT}`);
	});
};

export default startWebServer;
