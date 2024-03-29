import { type Response } from "express";
import { REFRESH_TOKEN_MAX_AGE_MS } from "../config/jwtConfig";

export const REFRESH_TOKEN_COOKIE_NAME =
	process.env.REFRESH_TOKEN_COOKIE_NAME || "appRefreshToken";

export const setRefreshTokenCookie = (res: Response, token: string) => {
	const cookieDomain =
		process.env.NODE_ENV === "production"
			? process.env.COOKIE_DOMAIN
			: "localhost";

	res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		domain: cookieDomain,
		maxAge: REFRESH_TOKEN_MAX_AGE_MS,
	});
};
