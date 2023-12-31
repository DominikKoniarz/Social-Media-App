import fs from "fs";

const fsp = fs.promises;

const createDirIfNotExists = async (dirPath: string) => {
	if (!fs.existsSync(dirPath)) await fsp.mkdir(dirPath);
};

export default createDirIfNotExists;
