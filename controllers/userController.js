const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        return err
          ? done(err)
          : user
          ? // ? password === user.password
            bcrypt.compareSync(password, user.password)
            ? done(null, user)
            : done(null, false, { message: "Incorrect password." })
          : done(null, false, { message: "Incorrect username." });
      });
    }
  )
);
////
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    err ? done(err) : done(null, user);
  });
});

// Здесь мы проверяем, передаем данные о пользователе в функцию верификации, котоую мы определили выше.
// Вообще, passport.authenticate() вызывает метод req.logIn автоматически, здесь же я указал это явно. Это добавляет удобство в отладке. Например, можно вставить сюда console.log(), чтобы посмотреть, что происходит...
// При удачной авторизации данные пользователя будут храниться в req.user
module.exports.login = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    return err
      ? next(err)
      : user
      ? req.logIn(user, function(err) {
          return err ? next(err) : res.redirect("/inside");
        })
      : res.redirect("/");
  })(req, res, next);
};

module.exports.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

var rand, host, link;
module.exports.register = function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var tempHash = bcrypt.genSaltSync(10);

  var passwordToSave = bcrypt.hashSync(req.body.password, salt);
  var random = Math.random()
    .toString(36)
    .substr(2, 10);

  tempHash = tempHash + random;

  var user = new User({
    username: req.body.login,
    password: passwordToSave,
    temporaryHash: tempHash
  });

  user.save(function(err) {
    return next(err);
  });

  rand = tempHash;
  host = req.get("host");
  link = "http://" + req.get("host") + "/user/verify?id=" + rand;
  var emailMessage = `<a href="${link}">Login</a><p style="color: #e47593; border: 2px solid black">Hello Pall Now is Rock</p>`;

  sendEmail(req.body.login, emailMessage);
};

module.exports.verify = function(req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");

      User.updateOne({ temporaryHash: rand }, { active: "true" }, function(
        err,
        result
      ) {
        if (err) return console.log(err);
      });

      User.updateOne({ temporaryHash: rand }, { temporaryHash: "" }, function(
        err,
        result
      ) {
        if (err) return console.log(err);
      });
      res.redirect("/");
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
};

var tempHash, linkEn, hostEn;
module.exports.restore = function(req, res, next) {
  tempHash = bcrypt.genSaltSync(10);
  linkEn = "http://" + req.get("host") + "/user/restore/email?id=" + tempHash;
  hostEn = req.get("host");

  User.updateOne(
    { username: req.body.email },
    { temporaryHash: tempHash },
    function(err, result) {
      if (err) return console.log(err);
    }
  );
  var mess = `<a href="${linkEn}">Restore</a><p style="color: #e47593; border: 2px solid black">Hello Pall Now is Rock</p>`;

  sendEmail(req.body.email, mess);
};

module.exports.restoreEmail = function(req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + hostEn) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == tempHash) {
      console.log("email is verified");

      res.redirect("/user/new-password");
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
};

module.exports.changePassword = function(req, res) {
  var salting = bcrypt.genSaltSync(10);

  var newPassword = bcrypt.hashSync(req.body.password, salting);

  User.updateOne(
    { temporaryHash: tempHash },
    { password: newPassword },
    function(err, result) {
      if (err) return console.log(err);
    }
  );

  User.updateOne({ temporaryHash: tempHash }, { temporaryHash: "" }, function(
    err,
    result
  ) {
    if (err) return console.log(err);
  });
  res.redirect("/");
};

function sendEmail(destinationEmail, message) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "johndoutesttest@gmail.com",
      pass: "johndou321"
    }
  });
  var mailOptions = {
    from: "johndoutesttest@gmail.com", // sender address
    to: destinationEmail, // list of receivers
    subject: "Email From NodeJs", // Subject line
    html: message // plain text body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
