import getDbInstance from "./db";

const connectDb = async () => {
	const prisma = getDbInstance();

	try {
		await prisma.$connect();
		console.log("Database connected");
	} catch (error) {
		console.log("Cannot connect with database!", error);
	}
};

export default connectDb;
