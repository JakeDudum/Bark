var db = require("../models");
var Sequelize = require("sequelize");

module.exports = {
    findAllLocation: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Post.findAll({
            where: {
                city: req.params.city
            },
            include: [db.Blogger, { model: db.Like, where: { BloggerUuid: bloggerID }, required: false }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    findAllCategory: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Post.findAll({
            where: {
                city: req.params.city,
                CategoryId: req.params.categoryId
            },
            include: [db.Blogger, { model: db.Like, where: { BloggerUuid: bloggerID }, required: false }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    getOne: function (req, res) {
        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Blogger, db.Like]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    create: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Post.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            city: req.body.city,
            CategoryId: parseInt(req.body.CategoryId),
            BloggerUuid: bloggerID
        }, {
            include: [db.Blogger]
        })
            .then(function (newPost) {
                res.json(newPost);
            })
    },
    remove: function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    update: function (req, res) {
        db.Post.update(req.body, {
            where: {
                id: req.params.postId
            },
            include: [db.Blogger, db.Like]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    findAllPosts: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Post.findAll({
            where: {
                BloggerUuid: bloggerID
            },
            include: [db.Blogger, { model: db.Like, where: { BloggerUuid: bloggerID }, required: false }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    addLike: function (req, res) {
        db.Post.increment('likes', {
            where: { id: req.params.id },
            include: [db.Like]
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    },
    removeLike: function (req, res) {
        db.Post.decrement('likes', { where: { id: req.params.id } })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    },
    searchAllCityPosts: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Post.findAll({
            where: {
                city: req.params.city,
                $col: Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), { [Sequelize.Op.like]: '%' + req.params.searchTerm + '%' })
            },
            include: [db.Blogger, { model: db.Like, where: { BloggerUuid: bloggerID }, required: false }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    },
    searchAllPosts: function (req, res) {
        var bloggerID = req.session.passport.user;
        db.Post.findAll({
            where: {
                BloggerUuid: bloggerID,
                $col: Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), { [Sequelize.Op.like]: '%' + req.params.searchTerm + '%' })
            },
            include: [db.Blogger, { model: db.Like, where: { BloggerUuid: bloggerID }, required: false }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    }
};

