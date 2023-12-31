import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  CropData,
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

const prisma = getDbInstance();

const getUserDir = (userId: string): string => path.join(MEDIA_DIR, userId);
const getUserAvatarDir = (userId: string): string =>
  path.join(MEDIA_DIR, userId, "avatar");

const createRequiredDirs = async (userId: string) => {
  const userDir = getUserDir(userId);
  await createDirIfNotExists(userDir);

  const avatarDir = getUserAvatarDir(userId);
  await createDirIfNotExists(avatarDir);
};

const validateCropData = (cropData: CropData): boolean => {
  const { height, width, x, y, scaleX, scaleY } = cropData;

  if (height < 0 || width < 0 || x < 0 || y < 0 || scaleX < 0 || scaleY < 0)
    return false;

  return true;
};

const saveAvatarImage = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  socket.on(
    "saveAvatarImage",
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

        if (foundUser.avatarImage)
          await fsp.rm(
            path.join(getUserAvatarDir(userId), foundUser.avatarImage),
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
          .resize({ height: 128, width: 128 })
          .webp()
          .toBuffer();

        const imageNameWithoutExtension = path.parse(imageName).name;
        const newImageName = `${imageNameWithoutExtension}.webp`;

        await fsp.writeFile(
          path.join(getUserAvatarDir(userId), newImageName),
          croppedImageBuffer
        );

        await prisma.user.update({
          data: {
            avatarImage: newImageName,
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

        socket.emit("serverError", errorMessage);

        logError(
          `Save user avatar image error! Socket id: ${socket.id}`,
          errorMessage,
          "socketErrorsLog.txt"
        );
      }
    }
  );
};

export default saveAvatarImage;
