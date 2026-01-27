const postModel = require("../models/post.model.js");

async function createPost(req,res) {
    try {
    const { title, content, tags, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await postModel.create({
      title,
      content,
      tags,
      status,
      author: req.user._id, // from auth middleware
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getPosts(req, res) {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const tag = req.query.tag;

    const query = {
      status: "published",
      title: { $regex: search, $options: "i" },
    };

    if (tag) {
      query.tags = tag;
    }

    const posts = await Post.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
    createPost,
    getPosts,
}