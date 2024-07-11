const { Router } = require("express");
const OrderItemsController = require("../../controllers/OrderItemsController");

const routes = new Router();

routes.get("/", OrderItemsController.index);
routes.get("/:id", OrderItemsController.index);
routes.post("/", OrderItemsController.store);
routes.put("/:id", OrderItemsController.update);
routes.delete("/:id", OrderItemsController.destroy);

module.exports = routes;
