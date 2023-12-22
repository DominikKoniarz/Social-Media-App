import logger from "../middleware/logger";
import { type Express } from "express";

const useIfDev = (app: Express) => {
	if (process.env.NODE_ENV !== "production") {
		app.use(logger);
	}
};

export default useIfDev;
