import { Router } from "express";
import rootPageController from "../controllers/rootPageController";

const rootRouter = Router();

const paths = ["/"];

rootRouter.get(paths, rootPageController);

export default rootRouter;
