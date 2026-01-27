const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.Middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");

router.get("/me", authMiddleware.protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin-only", authMiddleware.protect, roleMiddleware.authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;