import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";
import enableIfProduction from "./lib/enableIfProduction";

const app = express();

app.use(cors(corsConfig));

enableIfProduction(app);
