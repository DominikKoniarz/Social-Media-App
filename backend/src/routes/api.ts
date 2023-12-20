import { Router } from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";

const apiRouter = Router();

apiRouter.route("/register").post(registerController);

apiRouter.route("/login").post(loginController);

export default apiRouter;
