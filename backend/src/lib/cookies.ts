import { type Response } from "express";

const REFRESH_TOKEN_COOKIE_NAME =
	process.env.REFRESH_TOKEN_COOKIE_NAME || "appRefreshToken";

export const setRefreshTokenCookie = (res: Response, token: string) => {
	res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		path: "/",
		domain:
			process.env.NODE_ENV === "production"
				? process.env.COOKIE_DOMAIN
				: "localhost",
		maxAge: 24 * 60 * 60 * 1000,
	});
};
