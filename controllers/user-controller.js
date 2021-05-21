var db = require("../models");

// Defining methods for the UserController
module.exports = {
    find: function (req, res) {
        if (req.isAuthenticated()) {
            db.Blogger
                .findOne({ where: { uuid: req.session.passport.user } })
                .then(function (dbUser) { res.json(dbUser) })
                .catch(function (err) { res.status(422).json(err) });
        }
        res.status(401).json("error");
    },
    update: function (req, res) {
        if (req.isAuthenticated()) {
            db.Blogger
                .update(req.body, { where: { uuid: req.session.passport.user } })
                .then(function (dbUser) { res.json(dbUser) })
                .catch(function (err) { res.status(422).json(err) });
        }
        res.status(401).json("error");
    },
    delete: function (req, res) {
        if (req.isAuthenticated()) {
            db.Blogger
                .destroy({ where: { uuid: req.session.passport.user } })
                .then(function (deletedUsed) {
                    res.json(deletedUsed);
                })
                .catch(function (err) { res.status(422).json(err) });
        }
        res.status(401).json("error");
    }
};