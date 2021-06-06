import express from "express";
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo, postEdit } from "../controllers/videoController";
import { protectorMiddleware, publicOnlyMiddleware, videoUpload } from "../middlewares"

const videoRouter = express.Router();


videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", videoDetail);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(editVideo).post(postEdit);
videoRouter.all(protectorMiddleware).get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;