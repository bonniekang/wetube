import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({})
        .sort({ createdAt: "desc" })
        .populate("owner");
        return res.render("home", { pageTitle: "Home", videos })
    } catch(error) {
        return res.render("server-error", { error })
    }
};
export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        })
    }
    res.render("search", { pageTitle: "Search", videos });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload Video"});

export const postUpload = async (req, res) => {
    const {
        user: { _id },
    } = req.session;
    const { video } = req.files;
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: video[0].location,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        })
        const user = await User.findById(_id)
        user.videos.push(newVideo._id)
        user.save()
        return res.redirect("/");
    } catch(error) {
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
    }
}

export const videoDetail = async (req, res) => { 
    const videos = await Video.find({}).populate("owner");
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
    if(!video){
        return res.status(404).render("404", {pageTitle: "video not found."})
    }
    return res.render("videoDetail", { pageTitle: `Watching ${video.title}`, video, videos });
}

export const editVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle: "video not found."})
    }
    if(String(video.owner) !== String(req.session.user._id)){
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    return res.render("editVideo", { pageTitle: `Editing ${video.title}`, video});
}
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({ _id: id });
    if(!video){
        return res.render("404", {pageTitle: "video not found."})
    }
    if(String(video.owner) !== String(req.session.user._id)){
        req.flash("error", "You are not the the owner of the video.");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${id}`);
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle: "video not found."})
    }
    if(String(video.owner) !== String(req.session.user._id)){
        
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const registerView = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id)
    if(!video){
        return res.sendStatus(404)
    }
    video.meta.views = video.meta.views + 1
    await video.save()
    return res.sendStatus(200)
}

export const createComment = async (req, res) => {
    const {
        session: { user },
        body: { text },
        params: { id },
    } = req;

    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404)
    }
    const comment = await Comment.create({
        text,
        owner: user._id,
        video: id,
    })
    video.comments.push(comment._id)
    video.save()
    return res.sendStatus(201)

}