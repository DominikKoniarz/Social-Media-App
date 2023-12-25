import type { NextFunction, Request, Response } from "express";
import { validate } from "email-validator";
import getDbInstance from "../initializers/db";
import bcrypt from "bcrypt";

const prisma = getDbInstance();

const registerController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, email, password } = req.body;

	if (!username || typeof username !== "string")
		return res.status(400).json({ message: "Username is required!" });

	if (username.length < 3)
		return res.status(400).json({
			message: "Username is to short! At least 3 characters are required!",
		});

	if (!email || typeof email !== "string")
		return res.status(400).json({ message: "Email is required!" });

	if (!validate(email))
		return res.status(400).json({ message: "Valid email is required!" });

	if (!password || typeof password !== "string")
		return res.status(400).json({ message: "Password is required!" });

	if (password.length < 8 || password.length > 18)
		return res.status(400).json({
			message:
				"Password length is incorrect! Should be between 8 and 18 characters.",
		});

	try {
		const foundUser = await prisma.user.findFirst({
			where: { OR: [{ email }, { username }] },
			select: { id: true },
		});

		if (foundUser)
			return res
				.status(403)
				.json({ message: "This email or username are already used!" });

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: { email, username, passwordHash: hashedPassword },
		});

		// res.status(201).json(result);
		res.status(201).json({ message: "User created successfully!" });
	} catch (error) {
		next(error);
	}
};

export default registerController;
