var router = require("express").Router();
var post = require("../../controllers/post-controller");

router.route("/")
    .post(post.create);

router.route("/findAll")
    .get(post.findAllPosts);

router.route("/like/:id")
    .put(post.addLike);

router.route("/dislike/:id")
    .put(post.removeLike);

router.route("/search/:searchTerm")
    .get(post.searchAllPosts);

router.route("/:city")
    .get(post.findAllLocation);

router.route("/find/:postId")
    .get(post.getOne)
    .put(post.update)
    .delete(post.remove);

router.route("/:city/category/:categoryId")
    .get(post.findAllCategory);

router.route("/:city/search/:searchTerm")
    .get(post.searchAllCityPosts);

module.exports = router;