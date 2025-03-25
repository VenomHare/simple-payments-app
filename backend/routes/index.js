const {Router} = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const v1Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/account", accountRouter);

module.exports = v1Router
