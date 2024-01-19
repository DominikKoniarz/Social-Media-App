import path from "path";
import getDbInstance from "../initializers/db";
import { MEDIA_DIR } from "../utils/createRequiredDirs";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../types/socket.io";
import { Socket } from "socket.io";
import { logError } from "../middleware/errorHandler";
import fsp from "fs/promises";

const prisma = getDbInstance();

const getPostDir = (userId: string, postId: string): string =>
  path.join(MEDIA_DIR, userId, "posts", postId);

const deletePost = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  socket.on("deletePost", async (id, sendError) => {
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

      const foundPost = await prisma.post.findUnique({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (!foundPost) throw new Error("Post not found or you are not owner");

      await prisma.post.delete({
        where: {
          id: id,
        },
      });

      if (foundPost.image) {
        const imagePath = getPostDir(userId, foundPost.id);
        await fsp.rm(imagePath, { force: true, recursive: true });
      }

      sendError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown server error!";

      sendError(errorMessage);

      logError(
        `Deleting Post error! Socket id: ${socket.id}`,
        errorMessage,
        "socketErrorsLog.txt"
      );
    }
  });
};

export default deletePost;
