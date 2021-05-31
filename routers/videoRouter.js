import express from "express";
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", videoDetail);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(editVideo).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;