import express from "express";
import { userDetail, getEditProfile, postEditProfile, changePassword, logout, startGithubLogin, finishGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEditProfile).post(postEditProfile);
userRouter.get("/change-password", changePassword);
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/:id", userDetail);

export default userRouter;