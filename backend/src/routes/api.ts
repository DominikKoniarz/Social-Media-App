import { Router } from "express";
import registerController from "../controllers/registerController";

const apiRouter = Router();

apiRouter.route("/register").post(registerController);

export default apiRouter;
