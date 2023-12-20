import logger from "../middleware/logger";
import { type Express } from "express";

const useIfDev = (app: Express) => {
	app.use(logger);
};

export default useIfDev;
