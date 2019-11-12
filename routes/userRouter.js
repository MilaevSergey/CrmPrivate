const express = require("express");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// определяем роутеры
const userRouter = express.Router(); // для адресов с "/users"

userRouter.post("/register", urlencodedParser, userController.register);
userRouter.post("/login", urlencodedParser, userController.login);
userRouter.post("/restore", urlencodedParser, userController.restore);
userRouter.post(
  "/change-password",
  urlencodedParser,
  userController.changePassword
);
userRouter.get("/login", function(req, res) {
  res.render("login.hbs");
});
userRouter.get("/register", function(req, res) {
  res.render("register.hbs");
});
userRouter.get("/restore-password", function(req, res) {
  res.render("restore-password.hbs");
});
userRouter.get("/logout", urlencodedParser, userController.logout);
userRouter.get("/verify", urlencodedParser, userController.verify);
userRouter.get("/restore/email", urlencodedParser, userController.restoreEmail);

module.exports = userRouter;
