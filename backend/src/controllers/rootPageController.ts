import type { NextFunction, Request, Response } from "express";
import path from "path";

const indexFilePath = path.join(
	process.cwd(),
	"..",
	"frontend",
	"dist",
	"index.html"
);

const rootPageController = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		res.sendFile(indexFilePath);
	} catch (error) {
		next(error);
	}
};

export default rootPageController;
