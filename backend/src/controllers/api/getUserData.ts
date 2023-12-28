import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../../lib/jwt";
import getDbInstance from "../../initializers/db";

const prisma = getDbInstance();

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
	const bearer = req.headers.authorization;
	if (!bearer)
		return res.status(401).json({ message: "Unauthorized! Token required!" });

	if (!bearer.includes(" "))
		return res
			.status(401)
			.json({ message: "Unauthorized! Wrong token format!" });

	const accessToken = bearer.split(" ")[1];

	try {
		const decoded = verifyAccessToken(accessToken);
		if (!decoded)
			return res
				.status(401)
				.json({ message: "Unauthorized! Token is invalid!" });

		const { userId } = decoded;

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				username: true,
				email: true,
				firstname: true,
				lastname: true,
				location: true,
				bio: true,
				websiteURL: true,
			},
		});

		if (!user)
			return res
				.status(401)
				.json({ message: "User not found! Token is invalid!" });

		return res.json(user);
	} catch (error) {
		next(error);
	}
};

export default getUserData;
