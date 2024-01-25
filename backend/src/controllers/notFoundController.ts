import { NextFunction, Request, Response } from "express";
import sendRootPage from "../lib/sendRootPage";

const notFoundController = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		res.status(404);

		if (req.accepts("html")) {
			process.env.NODE_ENV === "production"
				? sendRootPage(res)
				: res.send("Not Found! 404");
		} else if (req.accepts("application/json")) {
			res.json({ message: "404 Not Found!" });
		} else {
			res.type("text").send("404 Not Found");
		}
	} catch (error) {
		next(error);
	}
};

export default notFoundController;
