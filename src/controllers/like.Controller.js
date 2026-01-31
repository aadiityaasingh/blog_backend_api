const likeModel = require("../models/like.model.js");
const postModel = require("../models/post.model.js");

async function likePost(req, res) {
    try {
    const { id } = req.params;
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Draft protection
    if (
      post.status === "draft" &&
      req.user.role !== "admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Cannot like a draft post" });
    }

    // Try to create like
    const like = await likeModel.create({
      user: req.user._id,
      post: id,
    });

    res.status(201).json({ message: "Post liked" });
  } catch (error) {
    // Duplicate like error from unique index
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function unlikePost(req,res) {
    try {
    const { id } = req.params;

    const like = await likeModel.findOneAndDelete({
      user: req.user._id,
      post: id,
    });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json({ message: "Post unliked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function getPostLikes (req, res) {
    try {
        const {id} = req.params;
        const count = await likeModel.countDocuments({post: id});
        res.json({likes:count});
    } catch(error) {
        res.status(500).json({
            message: "sever error"
        })
    }
};

module.exports = {
    likePost,
    unlikePost,
    getPostLikes,
}