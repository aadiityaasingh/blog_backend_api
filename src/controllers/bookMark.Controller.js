const bookMarkModel = require("../models/bookMark.model.js");
const postModel = require("../models/post.model.js");

async function savePost(req,res) {
    try {
    const { id } = req.params;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Draft visibility rule
    if (
      post.status === "draft" &&
      req.user.role !== "admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Cannot bookmark a draft post" });
    }

    await bookMarkModel.create({
      user: req.user._id,
      post: id,
    });

    res.status(201).json({ message: "Post bookmarked" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Post already bookmarked" });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function removeBookMark(req, res) {
    try {
    const { id } = req.params;

    const bookmark = await bookMarkModel.findOneAndDelete({
      user: req.user._id,
      post: id,
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json({ message: "Bookmark removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function getMyBookMarks(req, res) {
     try {
    const bookmarks = await bookMarkModel.find({ user: req.user._id })
      .populate({
        path: "post",
        populate: { path: "author", select: "name email" },
      });

    const posts = bookmarks.map((b) => b.post);

    res.json({ total: posts.length, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
    savePost,
    removeBookMark,
    getMyBookMarks,
}