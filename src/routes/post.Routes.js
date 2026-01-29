const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.Controller.js");
const authMiddleware = require("../middlewares/auth.Middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");

router.get("/", postController.getPosts);
router.post("/", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.createPost);

router.get("/:id", postController.getSinglePost);
router.patch("/:id", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.updatePost);
router.delete("/:id", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.deletePost);

module.exports = router;
