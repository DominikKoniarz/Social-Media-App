import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../types/socket.io";
import getDbInstance from "../initializers/db";
import { logError } from "../middleware/errorHandler";
import { MEDIA_DIR } from "../utils/createRequiredDirs";
import path from "path";
import createDirIfNotExists from "../lib/createDirIfNotExists";
import sharp from "sharp";
import fsp from "fs/promises";
import validateCropData from "../lib/validateCropData";

const prisma = getDbInstance();

const getUserDir = (userId: string): string => path.join(MEDIA_DIR, userId);
const getUserBackgroundDir = (userId: string): string =>
  path.join(MEDIA_DIR, userId, "background");

const createRequiredDirs = async (userId: string) => {
  const userDir = getUserDir(userId);
  await createDirIfNotExists(userDir);

  const backgroundDir = getUserBackgroundDir(userId);
  await createDirIfNotExists(backgroundDir);
};

const saveBackgroundImage = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  socket.on(
    "saveBackgroundImage",
    async (imageBuffer, imageName, cropData, sendImageSrc) => {
      const userId = socket.data.userId;
      // shouldn't happen bc of the middleware which always set the userId
      if (!userId) return socket.disconnect();

      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!foundUser) return socket.disconnect();

        const areCropDataValid = validateCropData(cropData);
        if (!areCropDataValid) throw new Error("Invalid crop data!");

        if (foundUser.backgroundImage)
          await fsp.rm(
            path.join(getUserBackgroundDir(userId), foundUser.backgroundImage),
            { force: true }
          );

        await createRequiredDirs(userId);

        const extractData: sharp.Region = {
          height: parseInt(cropData.height.toString()),
          width: parseInt(cropData.width.toString()),
          left: parseInt(cropData.x.toString()),
          top: parseInt(cropData.y.toString()),
        };

        const croppedImageBuffer = await sharp(imageBuffer)
          .extract(extractData)
          .resize({ height: 257, width: 1292 })
          .webp()
          .toBuffer();

        const imageNameWithoutExtension = path.parse(imageName).name;
        const newImageName = `${imageNameWithoutExtension}.webp`;

        await fsp.writeFile(
          path.join(getUserBackgroundDir(userId), newImageName),
          croppedImageBuffer
        );

        await prisma.user.update({
          data: {
            backgroundImage: newImageName,
          },
          where: {
            id: userId,
          },
        });

        sendImageSrc(null, newImageName);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown server error!";

        sendImageSrc(errorMessage, null);

        logError(
          `Save user background image error! Socket id: ${socket.id}`,
          errorMessage,
          "socketErrorsLog.txt"
        );
      }
    }
  );
};

export default saveBackgroundImage;
