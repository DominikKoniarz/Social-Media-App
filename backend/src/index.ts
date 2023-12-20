import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import useIfProduction from "./lib/useIfProduction";
import startWebServer from "./initializers/startWebServer";
import errorHandler from "./middleware/errorHandler";
import notFoundController from "./controllers/notFoundController";
import useIfDev from "./lib/useIfDev";
import apiRouter from "./routes/api";

const app = express();

app.use(express.json());
app.use(cors(corsConfig));

useIfDev(app);
useIfProduction(app);

// routes
app.use("/api", apiRouter);

app.all("*", notFoundController);
app.use(errorHandler);

startWebServer(app);
