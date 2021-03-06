import express from "express";
import { userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword, logout, startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares"

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware,  logout);
userRouter.route("/edit")
    .all(protectorMiddleware)
    .get(getEditProfile)
    .post(uploadFiles.single("avatar"), postEditProfile);

userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

// publicOnlyMiddleware : if user logged in, shouldn't be allowed to come this page
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware,  finishGithubLogin)
userRouter.get("/:id", userDetail);

export default userRouter;