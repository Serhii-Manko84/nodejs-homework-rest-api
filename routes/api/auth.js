const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
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
  validateBody(schemas.loginSchema),
  ctrlWrapper(controllers.login)
);

router.get("/logout", authenticate, ctrlWrapper(controllers.logout));
router.get("/current", authenticate, ctrlWrapper(controllers.getCurrent));

router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(controllers.subscription)
);

module.exports = router;
