import { NextFunction, Request, Response } from "express";
import getDbInstance from "../initializers/db";
import { deleteOutdatedRefreshTokens } from "../lib/jwt";

const prisma = getDbInstance();

const logoutController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const refreshToken = req.cookies.appRefreshToken;
	if (!refreshToken || typeof refreshToken !== "string")
		return res.sendStatus(200);

	try {
		// Also delete access token on frontend

		await Promise.all([
			await prisma.refreshToken.deleteMany({
				where: {
					token: refreshToken,
				},
			}),
			deleteOutdatedRefreshTokens(),
		]);

		res.clearCookie("appRefreshToken");
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

export default logoutController;
