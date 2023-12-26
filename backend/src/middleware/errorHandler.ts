import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
const fsp = fs.promises;

const LOGS_DIR_PATH = path.join(process.cwd(), "logs");

export const logError = async (
	name: string,
	message: string,
	filename: string = "serverErrorsLog.txt"
) => {
	const filePathToAppend = path.join(LOGS_DIR_PATH, filename);
	const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${name}: ${message}\n`;

	try {
		if (!fs.existsSync(LOGS_DIR_PATH)) await fsp.mkdir(LOGS_DIR_PATH);

		await fsp.appendFile(filePathToAppend, logItem);
	} catch (error) {
		console.log(error);
	}
};

const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof Error) {
		logError(error.name, error.message, "serverErrorsLog.txt");
	} else {
		logError("Unknown error!", JSON.stringify(error), "serverErrorsLog.txt");
	}

	if (process.env.NODE_ENV !== "production") {
		res.status(500).json({ message: "Błąd serwera!", error: error.stack });
		console.log(error.stack);
		return;
	}

	res.status(500).json({ message: "Błąd serwera!" });
};

export default errorHandler;
