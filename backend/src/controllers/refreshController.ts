import { NextFunction, Request, Response } from "express";
import getDbInstance from "../initializers/db";
import {
	deleteOutdatedRefreshTokens,
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../lib/jwt";
import { setRefreshTokenCookie } from "../lib/cookies";

const prisma = getDbInstance();

const refreshController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { appRefreshToken } = req.cookies;

	if (!appRefreshToken || typeof appRefreshToken !== "string")
		return res.status(400).json({ message: "Refresh token cookie required!" });

	try {
		const decoded = verifyRefreshToken(appRefreshToken);

		if (!decoded) return res.status(401).json({ message: "Token is invalid" });

		const { id } = decoded;

		const foundUser = await prisma.user.findUnique({
			where: { id },
			select: { id: true },
		});
		if (!foundUser) return res.status(401).json({ message: "User not found" });

		const newAccessToken = generateAccessToken(foundUser.id);
		const newRefreshToken = generateRefreshToken(foundUser.id);

		await Promise.all([
			prisma.refreshToken.deleteMany({
				where: { token: appRefreshToken },
			}),
			prisma.refreshToken.create({
				data: {
					token: newRefreshToken,
					user: { connect: { id: foundUser.id } },
				},
			}),
			deleteOutdatedRefreshTokens(),
		]);

		setRefreshTokenCookie(res, newRefreshToken);

		res.json({ accessToken: newAccessToken });
	} catch (error) {
		next(error);
	}
};

export default refreshController;
