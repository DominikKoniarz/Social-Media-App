import { NextFunction, Request, Response } from "express";
import getDbInstance from "../initializers/db";
import { deleteOutdatedRefreshTokens } from "../lib/jwt";

const prisma = getDbInstance();

const logoutController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Also delete access token on frontend

		const refreshToken = req.cookies.appRefreshToken;
		if (!refreshToken) return res.sendStatus(204);

		await Promise.all([
			await prisma.refreshToken.deleteMany({
				where: {
					token: req.cookies.appRefreshToken,
				},
			}),
			deleteOutdatedRefreshTokens(),
		]);

		res.clearCookie("appRefreshToken");
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export default logoutController;
