import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import useIfDev from "./lib/useIfDev";
import useIfProduction from "./lib/useIfProduction";
import startWebServer from "./initializers/startWebServer";
import errorHandler from "./middleware/errorHandler";
import notFoundController from "./controllers/notFoundController";
import apiRouter from "./routes/api";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

useIfDev(app);
useIfProduction(app);

app.use("/media", express.static(path.join(process.cwd(), "media")));

// routes
app.use("/api", apiRouter);

app.all("*", notFoundController);
app.use(errorHandler);

startWebServer(server);
