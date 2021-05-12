var router = require("express").Router();
var path = require("path");

router.get("/", function (req, res) {
    var auth = req.isAuthenticated();

    if (auth) {
        res.sendFile(path.join(__dirname, "/../../public/home.html"));
    } else {
        res.sendFile(path.join(__dirname, "/../../public/login.html"));
    }

});

router.get("/signup", function (req, res) {
    var auth = req.isAuthenticated();

    if (auth) {
        res.sendFile(path.join(__dirname, "/../../public/home.html"));
    } else {
        res.sendFile(path.join(__dirname, "/../../public/signup.html"));
    }

});

router.get('/profile', function (req, res) {
    var auth = req.isAuthenticated();
    if (auth) {
        res.sendFile(path.join(__dirname, "/../../public/profile.html"));
    } else {
        res.redirect("/");
    }
})

module.exports = router;