import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

let prisma:
	| PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
	| undefined = undefined;

const getDbInstance = (): PrismaClient<
	Prisma.PrismaClientOptions,
	never,
	DefaultArgs
> => {
	if (prisma === undefined) prisma = new PrismaClient();

	return prisma;
};

export default getDbInstance;
