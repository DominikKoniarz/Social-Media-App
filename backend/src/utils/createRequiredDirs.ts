import path from "path";
import fs from "fs";

const fsp = fs.promises;

export const MEDIA_DIR = path.join(process.cwd(), "media");

const createRequiredDirs = async () => {
	try {
		fs.existsSync(MEDIA_DIR) || (await fsp.mkdir(MEDIA_DIR));
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default createRequiredDirs;
