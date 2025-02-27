const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = express.json();
const nodemailer = require("nodemailer");
const userRouter = require("./routes/userRouter");
// Middlewares, которые должны быть определены до passport:
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'SECRET' }));
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const i18n = require("i18n");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// Passport:
app.use(expressSession({ secret: "mySecretKey" }));
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs"
  })
);

i18n.configure({
  locales: ["ru", "en"],
  fallbacks: { en: "ru" },
  defaultLocale: "ru",
  cookie: "locale",
  queryParameter: "lang",
  directory: __dirname + "/locales",
  directoryPermissions: "755",
  autoReload: true,
  updateFiles: true,
  api: {
    __: "__", //now req.__ becomes req.__
    __n: "__n" //and req.__n can be called as req.__n
  }
});

app.set("view engine", "hbs");
// register hbs helpers in res.locals' context which provides this.locale
app.use(i18n.init);

hbs.registerHelper("__", function() {
  return i18n.__.apply(this, arguments);
});
hbs.registerHelper("__n", function() {
  return i18n.__n.apply(this, arguments);
});

hbs.registerPartials(__dirname + "/views/partials");
app.use("/css", express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/js", express.static(__dirname + "/public"));

app.use("/user", userRouter);

mustAuthenticatedMw = function(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect("/");
};

app.use("/inside", mustAuthenticatedMw, function(req, res) {
  res.render("admin-user.hbs", { user: req.user });
});
app.use("/inside/*", mustAuthenticatedMw, function(req, res) {
  res.render("admin-user.hbs");
});

app.use("/user/new-password", function(req, res) {
  res.render("new-password.hbs");
});

app.use("/", function(req, res) {
  res.render("enter.hbs");
});

mongoose.connect(
  "mongodb://localhost:27017/usersdb",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  function(err) {
    if (err) return console.log(err);
    app.listen(8080, function() {
      console.log("Сервер ожидает подключения...");
    });
  }
);
