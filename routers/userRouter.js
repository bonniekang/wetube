import express from "express";
import { userDetail, editProfile, changePassword, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", editProfile);
userRouter.get("/change-password", changePassword);
userRouter.get("/:id", userDetail);

export default userRouter;