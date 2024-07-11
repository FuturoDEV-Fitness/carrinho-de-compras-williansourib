const { createOrders } = require("./function/orders.store");
const { findAllOrders } = require("./function/orders.index");
const { updateOrder } = require("./function/orders.update");
const { deleteOrder } = require("./function/orders.destroy");

class OrdersController {
  async index(req, res) {
    await findAllOrders(req, res);
  }
  async store(req, res) {
    await createOrders(req, res);
  }

  async update(req, res) {
    await updateOrder(req, res);
  }

  async destroy(req, res) {
    await deleteOrder(req, res);
  }
}

module.exports = new OrdersController();
