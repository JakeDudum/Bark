var router = require("express").Router();

var userRoutes = require("./user");
var authRoutes = require("./auth");
var postRoutes = require("./post");
var likeRoutes = require("./like");

// ../api/...
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/like", likeRoutes);

module.exports = router;