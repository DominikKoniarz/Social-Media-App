import type { NextFunction, Request, Response } from "express";
import getDbInstance from "../initializers/db";
import {
	deleteOutdatedRefreshTokens,
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../lib/jwt";
import {
	REFRESH_TOKEN_COOKIE_NAME,
	setRefreshTokenCookie,
} from "../lib/cookies";

const prisma = getDbInstance();

const refreshController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

	if (!refreshToken || typeof refreshToken !== "string")
		return res.status(400).json({ message: "Refresh token cookie required!" });

	try {
		const decoded = verifyRefreshToken(refreshToken);

		if (!decoded) return res.status(401).json({ message: "Token is invalid!" });

		const { userId } = decoded;

		const foundUser = await prisma.user.findFirst({
			where: { id: userId },
			include: {
				refreshToken: {
					where: { token: refreshToken },
					select: { token: true },
				},
			},
		});
		if (!foundUser || foundUser.refreshToken.length === 0)
			return res.status(401).json({ message: "Token not found!" });

		const newAccessToken = generateAccessToken(foundUser.id);
		const newRefreshToken = generateRefreshToken(foundUser.id);

		await Promise.all([
			async () => {
				if (process.env.NODE_ENV === "production") {
					await prisma.refreshToken.delete({
						where: { token: refreshToken },
					});
				}
			},
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
