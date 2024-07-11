const { deleteClient } = require("./function/client.destroy");
const { findAllClients } = require("./function/client.index");
const { createClient } = require("./function/client.store");
const { updateClient } = require("./function/client.update");

class ClientsController {
  async index(req, res) {
    await findAllClients(req, res);
  }
  async store(req, res) {
    await createClient(req, res);
  }
  async update(req, res) {
    await updateClient(req, res);
  }
  async destroy(req, res) {
    await deleteClient(req, res);
  }
}

module.exports = new ClientsController();
