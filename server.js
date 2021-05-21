require("dotenv").config();

var express = require("express");
var passport = require("passport");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 8080;

var routes = require("./routes")
var db = require("./models");

// Configuration =========
require("./config/passport")(passport);

// Middleware ============
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 10800000, // 3 HRS
    httpOnly: false
  }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(routes);

// Launch server ==============
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
