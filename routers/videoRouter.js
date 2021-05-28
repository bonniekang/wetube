import express from "express";
import { upload, videoDetail, editVideo, deleteVideo, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", videoDetail);
videoRouter.route("/:id(\\d+)/edit").get(editVideo).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;