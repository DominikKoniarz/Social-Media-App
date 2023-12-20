import { NextFunction, Request, Response } from "express";
import getDbInstance from "../initializers/db";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";

const prisma = getDbInstance();

const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (!email || typeof email !== "string")
		return res.status(400).json({ message: "Email is required!" });

	if (!password || typeof password !== "string")
		return res.status(400).json({ message: "Password is required!" });

	try {
		const foundUser = await prisma.user.findFirst({
			where: { email },
		});

		if (!foundUser)
			return res.status(403).json({ message: "Invalid email or password!" });

		const isPasswordValid = await bcrypt.compare(
			password,
			foundUser.passwordHash
		);

		if (!isPasswordValid)
			return res.status(403).json({ message: "Invalid email or password!" });

		const accessToken = generateAccessToken(foundUser.id);
		const refreshToken = generateRefreshToken(foundUser.id);

		res.cookie("appRefreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production" ? true : false,
			path: "/",
			domain:
				process.env.NODE_ENV === "production"
					? process.env.APP_HOSTNAME
					: "http://localhost:3000",
		});

		await prisma.user.update({
			where: { id: foundUser.id },
			data: { refreshToken: { create: [{ token: refreshToken }] } },
		});

		return res.status(200).json({ accessToken });
	} catch (error) {
		next(error);
	}
};

export default loginController;
