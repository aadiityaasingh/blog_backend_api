const postModel = require("../models/post.model.js");
const userModel = require("../models/user.model.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
};

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

    const posts = await postModel.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await postModel.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

async function getSinglePost(req, res) {
   try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await postModel.findById(id).populate("author", "name email role");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.status === "published") {
      return res.json(post);
    }

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Login required to view draft" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Allow only author or admin
    if (
      user.role !== "admin" &&
      post.author._id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed to view this draft" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function updatePost(req,res){
  try {
    const { id } = req.params;
    const { title, content, status, tags } = req.body;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }


    if (
      req.user.role !== "admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed to edit this post" });
    }


    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (status !== undefined) post.status = status;
    if (tags !== undefined) post.tags = tags;


    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      req.user.role !== "admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed to delete this post" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    createPost,
    getPosts,
    getSinglePost,
    updatePost,
    deletePost,
}