var db = require("../models");

// Defining methods for the accountController
module.exports = {
  find: function (req, res) {
    if (req.isAuthenticated()) {
      console.log("loggedin")
      db.Account
        .findOne({ where: { userUUID: req.session.passport.user }, include: [db.Blogger] })
        .then(dbaccount => {
          if (dbaccount === null) {
            res.json({ message: "please add account" })
          } else {
            res.json({ message: null, account: dbaccount });
          }

        })
        .catch(function (err) {
          console.log(err)
          res.json(err)
        });


    }
    else {
      console.log("test")
      res.json("error");
    }
  },
  create: function (req, res) {
    if (req.isAuthenticated()) {
      db.Account
        .create(req.body, { userUUID: req.session.passport.user })
        .then(function (dbaccount) {
          res.json(dbaccount);
        })
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json("error");
  },
  update: function (req, res) {
    if (req.isAuthenticated()) {
      db.Account
        .update(req.body, { where: { userUUID: req.session.passport.user } })
        .then(function (dbaccount) {
          res.json(dbaccount);
        })
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);
  },
  delete: function (req, res) {
    if (req.isAuthenticated()) {
      db.Account
        .destroy({ where: { userUUID: req.session.passport.user } })
        .then(dbaccount => {
          res.json(dbaccount);
        })
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);
  }
};