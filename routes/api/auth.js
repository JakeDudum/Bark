var router = require("express").Router();
var passport = require('passport');

// ALL match with /api/auth....
// =====================================
// LOGIN ===============================
// =====================================
router.post('/login', function (req, res, next) {
  passport.authenticate("local-login", function (err, user, info) {
    console.log(user)

    if (err) {
      console.log(err)
      return next(err); // will generate a 500 error
    }
    if (!user) {
      console.log(user)
      console.log(info)
      return res.json({ success: false, message: info });
    }
    else {
      req.login(user, function (loginErr) {
        if (loginErr) {
          console.log("loginerr", loginErr)
          return next(loginErr);
        }
        res.cookie('user_email', user.email);
        res.cookie('authenticated', "true");
        res.cookie('user_name', user.name);

        return res.json({ success: true });
      });
    }
  })(req, res, next);
});

// =====================================
// SIGNUP ==============================
// =====================================
router.post('/signup', function (req, res, next) {

  passport.authenticate("local-signup", function (err, user, info) {
    console.log(user)
    if (err) {
      console.log(err)
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      console.log(user)
      console.log(info)
      return res.send({ success: false, message: info });
    }

    else {
      req.login(user, function (loginErr) {
        if (loginErr) {
          console.log("loginerr", loginErr)
          return next(loginErr);
        }

        res.cookie('user_email', user.email);
        res.cookie('user_name', user.name);
        res.cookie('authenticated', "true");
        res.cookie('user_name', user.name);

        return res.json({ success: true });
      });
    }
  })(req, res, next);
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function (req, res, next) {
  console.log("logout");
  req.session.destroy(function (err) {
    if (err) return next(err); // will generate a 500 error

    req.logout();
    res.clearCookie("user_sid");
    res.clearCookie("user_email");
    res.clearCookie("authenticated");

    res.json(true);
  });
});

// =====================================
// VALIDATE ============================
// =====================================
router.get('/auth', function (req, res) {
  var auth = req.isAuthenticated();

  res.json(auth); // true or false
});

module.exports = router;