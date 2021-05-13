var router = require("express").Router();
var like = require("../../controllers/like-controller");

router.route("/get")
    .get(like.find);

router.route("/post/:id")
    .post(like.create);

router.route("/:id")
    .delete(like.remove);

module.exports = router;