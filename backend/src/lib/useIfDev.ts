import logger from "../middleware/logger";
import { NextFunction, Request, Response, type Express } from "express";

const useIfDev = (app: Express) => {
	if (process.env.NODE_ENV !== "production") {
		app.use(logger);

		app.use("/media", (req: Request, res: Response, next: NextFunction) => {
			res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
			next();
		});
	}
};

export default useIfDev;
