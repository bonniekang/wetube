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

export const upload = (req, res) => res.render("upload", { pageTitle: "Upload"});

export const videoDetail = (req, res) => { 
    const { id } = req.params;
    return res.render("videoDetail", { pageTitle: `Watching ${video.title}`});
}
export const editVideo = (req, res) => {
    const { id } = req.params;
    return res.render("editVideo", { pageTitle: `Editing ${video.title}`});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
}

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});