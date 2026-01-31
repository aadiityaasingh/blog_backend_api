const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.Controller.js");
const likeController = require("../controllers/like.Controller.js");
const bookMarkController = require("../controllers/bookMark.Controller.js");
const authMiddleware = require("../middlewares/auth.Middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");

router.get("/", postController.getPosts);
router.post("/", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.createPost);

router.get("/:id", postController.getSinglePost);
router.patch("/:id", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.updatePost);
router.delete("/:id", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.deletePost);

router.post("/:id/like" , authMiddleware.protect, likeController.likePost);
router.delete("/:id/like", authMiddleware.protect, likeController.unlikePost);
router.get("/:id/likes", likeController.getPostLikes);

router.post("/:id/bookmark", authMiddleware.protect, bookMarkController.savePost);
router.delete("/:id/bookmark", authMiddleware.protect, bookMarkController.removeBookMark);



module.exports = router;
