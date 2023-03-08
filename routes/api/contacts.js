const express = require("express");
const { ctrlWrapper } = require("../../helpers/index");
const { validateBody, authenticate } = require("../../middlewares/");
const { schemas } = require("../../models/contacts");

const controllers = require("../../controller/contacts");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(controllers.getAll));
router.get("/", authenticate, ctrlWrapper(controllers.getAllPaginate));
router.get("/", authenticate, ctrlWrapper(controllers.getAllFavorite));

router.get("/:id", authenticate, ctrlWrapper(controllers.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.add)
);

router.delete("/:id", authenticate, ctrlWrapper(controllers.deleteContact));

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateById)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

module.exports = router;
