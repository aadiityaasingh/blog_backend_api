const postModel = require("../models/post.model.js");
const userModel = require("../models/user.model.js");
const commentModel = require("../models/comment.model.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

async function createComment(req, res) {
    try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      post.status === "draft" &&
      req.user.role !== "admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Cannot comment on draft post" });
    }

    const comment = await commentModel.create({
      text,
      post: postId,
      user: req.user._id,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function deleteComment(req, res) {
    try {
    const { id } = req.params;

    const comment = await commentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await postModel.findById(comment.post);
    const isCommentOwner = comment.user.toString() === req.user._id.toString();
    const isPostOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isCommentOwner && !isPostOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to delete this comment" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
    createComment,
    deleteComment,
}