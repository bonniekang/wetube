import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import { localsMiddleware } from "./middlewares"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter"

const app = express();

app.use(helmet({ contentSecurityPolicy: false })); //security
app.set('view engine', "pug");
app.use(morgan("dev")); //log

// locals => globals
//1.app.use((req, res, next) => {})

//2.app.use(function(req, res, next){})

app.use(localsMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;