import { Router } from "express";
import rootPageController from "../controllers/rootPageController";

const rootRouter = Router();

const paths = [
	"/",
	"/login",
	"/register",
	"/profile",
	"/profileEdit",
	"/profile/:id",
	"/messages",
	"/messages/:id",
	"/messages/new/:id",
	"/notifications",
];

rootRouter.get(paths, rootPageController);

export default rootRouter;
