const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const validateBody = require("../../middlewares");
const { schemas } = require("../../models/user");

const controllers = require("../../controller/auth");

const router = express.Router();

//sign up
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(controllers.register)
);

//sign in
router.post(
  "/login",
  validateBody(schemas.loginSchemas),
  ctrlWrapper(controllers.login)
);

module.exports = router;
