import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
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
    const file = req.file;
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: file.path,
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
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");
    if(!video){
        return res.status(404).render("404", {pageTitle: "video not found."})
    }
    return res.render("videoDetail", { pageTitle: `Watching ${video.title}`, video });
}

export const editVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle: "video not found."})
    }
    if(String(video.owner) !== String(req.session.user._id)){
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