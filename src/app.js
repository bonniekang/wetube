import express from "express"
import morgan from "morgan"
import session from "express-session"
import flash from "express-flash"
import MongoStore from "connect-mongo"
import { localsMiddleware } from "./middlewares"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter"
import apiRouter from "./routers/apiRouter"
const app = express();


app.set('view engine', "pug");
app.set("views", process.cwd() + "./src/views");
app.use(morgan("dev")); //log

// locals => globals
//1.app.use((req, res, next) => {})

//2.app.use(function(req, res, next){})
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
     //change secret word later
     secret: process.env.COOKIE_SECRET,
     resave: false,
     saveUninitialized: false,
     cookie: {
         maxAge: 20000,
     },
     store: MongoStore.create({mongoUrl: process.env.DB_URL}),
}))
app.use(flash())
app.use(localsMiddleware)
app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter)

export default app;