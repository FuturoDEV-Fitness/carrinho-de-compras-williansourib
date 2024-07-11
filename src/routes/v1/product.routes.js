const router = require("express").Router();

const ProductsController = require("../../controllers/ProductsController");

router.get("/", ProductsController.index);
router.get("/:id", ProductsController.index);
router.post("/", ProductsController.store);
router.put("/:id", ProductsController.update);
router.delete("/:id", ProductsController.destroy);

module.exports = router;
