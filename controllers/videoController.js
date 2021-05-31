import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({})
        return res.render("home", { pageTitle: "Home", videos })
    } catch(error) {
        return res.render("server-error", { error })
    }
};
export const search = (req, res) => {
    const {query: { term: searchingBy }} = req;
    // const searchingBy = req.query.term
    res.render("search", { pageTitle: "Search", searchingBy });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload Video"});

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(',').map((word) => `#${word}`),
        })
        return res.redirect("/");
    } catch(error) {
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
    }
}

export const videoDetail = async (req, res) => { 
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "video not found."})
    }
    return res.render("videoDetail", { pageTitle: `Watching ${video.title}`, video });
}

export const editVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "video not found."})
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
    await Video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags,
    })
    return res.redirect(`/videos/${id}`);
}

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});