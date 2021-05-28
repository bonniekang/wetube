let videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      views: 1,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 2,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 3,
    },
  ];


export const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => {
    const {query: { term: searchingBy }} = req;
    // const searchingBy = req.query.term
    res.render("search", { pageTitle: "Search", searchingBy });
};

export const upload = (req, res) => res.render("upload", { pageTitle: "Upload"});

export const videoDetail = (req, res) => { 
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("videoDetail", { pageTitle: `Watching ${video.title}`, video});
}
export const editVideo = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("editVideo", { pageTitle: `Editing ${video.title}`, video});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
}

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});