const router = require("express").Router();

const OrdersController = require("../../controllers/OrdersController");

router.get("/", OrdersController.index);
router.get("/:id", OrdersController.index);
router.post("/", OrdersController.store);
router.put("/:id", OrdersController.update);
router.delete("/:id", OrdersController.destroy);

module.exports = router;
