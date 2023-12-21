import jwt from "jsonwebtoken";
import getDbInstance from "../initializers/db";

const prisma = getDbInstance();

export const generateAccessToken = (id: number): string => {
	const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "at_secret";

	return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
		expiresIn: "30s",
	});
};

export const generateRefreshToken = (id: number): string => {
	const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "rt_secret";

	return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
		expiresIn: "1d",
	});
};

export const deleteOutdatedRefreshTokens = async (): Promise<void> => {
	await prisma.refreshToken.deleteMany({
		where: {
			createdAt: {
				lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
			},
		},
	});
};
