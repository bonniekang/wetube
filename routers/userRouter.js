import express from "express";
import { userDetail, users, editProfile, changePassword, logout } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.logout, logout);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;