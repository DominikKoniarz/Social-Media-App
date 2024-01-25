import { Response } from "express";
import path from "path";

const indexFilePath = path.join(
	process.cwd(),
	"..",
	"frontend",
	"dist",
	"index.html"
);

export default function sendRootPage(res: Response<any, Record<string, any>>) {
	res.sendFile(indexFilePath);
}
