import { Express } from "express";
import helmet from "helmet";
import helmetConfig from "../config/helmetConfig";

const enableIfProduction = (app: Express) => {
	if (process.env.NODE_ENV === "production") {
		app.use(helmet(helmetConfig));
	}
};

export default enableIfProduction;
