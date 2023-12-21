import { Router } from "express";
import rootPageController from "../controllers/rootPageController";

const rootRouter = Router();

const paths = ["/", "/login", "/register", "/mainpage"];

rootRouter.get(paths, rootPageController);

export default rootRouter;
