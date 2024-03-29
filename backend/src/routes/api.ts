import { Router } from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import logoutController from "../controllers/logoutController";
import refreshController from "../controllers/refreshController";

const apiRouter = Router();

apiRouter.route("/register").post(registerController);

apiRouter.route("/login").post(loginController);

apiRouter.route("/logout").get(logoutController);

apiRouter.route("/refresh").get(refreshController);

export default apiRouter;
