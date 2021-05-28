import express from "express";
import { upload, videoDetail, editVideo, deleteVideo, postEdit } from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();


videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.route(routes.editVideo).get( editVideo).post(postEdit);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;