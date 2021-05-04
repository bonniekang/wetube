import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { localsMiddleware } from "./middlewares"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter"
import routes from "./routes";

const app = express();

app.use(helmet({ contentSecurityPolicy: false })); //security
app.set('view engine', "pug");
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //log

// locals => globals
//1.app.use((req, res, next) => {})

//2.app.use(function(req, res, next){})

app.use(localsMiddleware)

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;