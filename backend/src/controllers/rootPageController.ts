import type { NextFunction, Request, Response } from "express";
import sendRootPage from "../lib/sendRootPage";

const rootPageController = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		sendRootPage(res);
	} catch (error) {
		next(error);
	}
};

export default rootPageController;
