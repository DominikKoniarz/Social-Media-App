import express, { type Express } from "express";
import helmet from "helmet";
import helmetConfig from "../config/helmetConfig";
import rootRouter from "../routes/root";
import path from "path";

const assetsPath = path.join(process.cwd(), "..", "frontend", "dist", "assets");

const useIfProduction = (app: Express) => {
	if (process.env.NODE_ENV === "production") {
		app.use(helmet(helmetConfig));

		app.use("/", rootRouter);
		app.use("/assets", express.static(assetsPath));
	}
};

export default useIfProduction;
