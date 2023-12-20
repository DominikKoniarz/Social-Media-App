import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import useIfProduction from "./lib/useIfProduction";
import startWebServer from "./initializers/startWebServer";

const app = express();

app.use(cors(corsConfig));

useIfProduction(app);

startWebServer(app);
