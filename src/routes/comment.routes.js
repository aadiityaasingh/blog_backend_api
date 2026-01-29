const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.Middleware.js");
const commentController = require("../controllers/comment.Controller.js");

router.post("/:postId" , authMiddleware.protect, commentController.createComment);
router.delete("/:id", authMiddleware.protect, commentController.deleteComment);

module.exports = router;