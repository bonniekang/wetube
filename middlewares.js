import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.siteName = 'WeTube';
    res.locals.loggedInUser = req.session.user || {};
    res.locals.routes = routes;
    next();
}