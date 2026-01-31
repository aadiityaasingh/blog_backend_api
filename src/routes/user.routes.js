const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.Controller.js");
const likeController = require("../controllers/like.Controller.js");
const bookMarkController = require("../controllers/bookMark.Controller.js");
const authMiddleware = require("../middlewares/auth.Middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");

router.get("/me/bookmarks", authMiddleware.protect, bookMarkController.getMyBookMarks);

module.exports = router;