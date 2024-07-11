const { createOrderItem } = require("./function/order_items.create");
const { deleteOrderItem } = require("./function/order_items.destroy");
const { findAllOrderItems } = require("./function/order_items.index");
const { updateOrderItem } = require("./function/order_items.update");

class OrderItemsController {
  async store(req, res) {
    await createOrderItem(req, res);
  }

  async index(req, res) {
    await findAllOrderItems(req, res);
  }

  async update(req, res) {
    await updateOrderItem(req, res);
  }

  async destroy(req, res) {
    await deleteOrderItem(req, res);
  }
}

module.exports = new OrderItemsController();
