const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.Controller.js");
const authMiddleware = require("../middlewares/auth.Middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");

router.get("/", postController.getPosts);
router.post("/", authMiddleware.protect, roleMiddleware.authorizeRoles("admin", "author"), postController.createPost);


module.exports = router;
