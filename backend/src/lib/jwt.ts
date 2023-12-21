import jwt from "jsonwebtoken";
import getDbInstance from "../initializers/db";
import z from "zod";

const accessTokenData = z.object({
	id: z.number(),
});

const refreshTokenData = z.object({
	id: z.number(),
});

type AccessTokenData = z.infer<typeof accessTokenData>;
type RefreshTokenData = z.infer<typeof refreshTokenData>;

const prisma = getDbInstance();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "at_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "rt_secret";

export const generateAccessToken = (id: number): string => {
	const accessTokenData: AccessTokenData = { id };
	return jwt.sign(accessTokenData, ACCESS_TOKEN_SECRET, {
		expiresIn: "30s",
		// algorithm: "ES256",
	});
};

export const generateRefreshToken = (id: number): string => {
	const refreshTokenData: RefreshTokenData = { id };
	return jwt.sign(refreshTokenData, REFRESH_TOKEN_SECRET, {
		expiresIn: "1d",
		// algorithm: "ES256",
	});
};

export const verifyRefreshToken = (
	refreshToken: string
): undefined | RefreshTokenData => {
	const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

	if (!refreshTokenData.safeParse(decoded).success) return undefined;

	return decoded as RefreshTokenData;
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
