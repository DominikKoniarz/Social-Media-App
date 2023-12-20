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
	const { name, email, password } = req.body;

	if (!name || typeof name !== "string")
		return res.status(400).json({ message: "Name is required!" });

	if (name.length < 3)
		return res.status(400).json({
			message: "Name is to short! At least 3 characters are required!",
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
			where: { email },
			select: { id: true },
		});

		if (foundUser)
			return res.status(403).json({ message: "This email is already used!" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await prisma.user.create({
			data: {
				email: email,
				name: name,
				passwordHash: hashedPassword,
			},
		});

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export default registerController;
