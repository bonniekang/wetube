import Video from "../models/Video";

export const home = (req, res) => {
    Video.find({}, (error, videos) => {
        console.log("error", error);
        console.log("videos", videos)
    })
    res.render("home", { pageTitle: "Home", videos});
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