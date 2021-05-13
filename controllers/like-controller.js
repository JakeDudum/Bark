var db = require("../models");

module.exports = {
    find: function (req, res) {
        db.Like.findAll({
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    create: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Like.create({
            PostId: req.params.id,
            BloggerUuid: bloggerID
        }).then(function (newLike) {
            res.json(newLike);
        })
    },
    remove: function (req, res) {
        db.Like.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbLike) {
            res.json(dbLike);
        });
    }
};

