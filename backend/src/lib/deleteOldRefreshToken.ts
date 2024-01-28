import getDbInstance from "../initializers/db";

const prisma = getDbInstance();

const deleteOldRefreshToken = async (refreshToken: string) => {
	if (process.env.NODE_ENV === "production") {
		await prisma.refreshToken.delete({
			where: { token: refreshToken },
		});
	}
};

export default deleteOldRefreshToken;
