const { deleteProduct } = require("./function/product.destroy");
const { findAllProducts } = require("./function/product.index");
const { updateProduct } = require("./function/product.update");
const { createProduct } = require("./function/products.store");

class ProductsController {
  async store(req, res) {
    await createProduct(req, res);
  }
  async index(req, res) {
    await findAllProducts(req, res);
  }

  async update(req, res) {
    await updateProduct(req, res);
  }

  async destroy(req, res) {
    await deleteProduct(req, res);
  }
}

module.exports = new ProductsController();
