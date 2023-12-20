import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import useIfProduction from "./lib/useIfProduction";
import startWebServer from "./initializers/startWebServer";
import errorHandler from "./middleware/errorHandler";
import notFoundController from "./controllers/notFoundController";

const app = express();

app.use(cors(corsConfig));

useIfProduction(app);

app.all("*", notFoundController);
app.use(errorHandler);

startWebServer(app);
