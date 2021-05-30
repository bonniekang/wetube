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
    await Video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(',').map((word) => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    })
    return res.redirect("/");
}

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