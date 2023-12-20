import jwt from "jsonwebtoken";

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
