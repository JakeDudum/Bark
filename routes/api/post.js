var router = require("express").Router();
var post = require("../../controllers/post-controller");

router.route("/")
    .post(post.create);

router.route("/findAll")
    .get(post.findAllPosts);

router.route("/search/:searchTerm")
    .get(post.searchAllPosts);

router.route("/:city")
    .get(post.findAllLocation);

router.route("/:postId")
    .get(post.getOne)
    .put(post.update)
    .delete(post.remove);

router.route("/:city/category/:categoryId")
    .get(post.findAllCategory);

module.exports = router;