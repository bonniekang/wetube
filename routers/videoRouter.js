import express from "express";
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id(\\d+)", videoDetail);
videoRouter.route("/:id(\\d+)/edit").get(editVideo).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;