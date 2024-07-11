require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const PORT_API = process.env.APP_PORT || 3000;

class Server {
  constructor(app = express()) {
    this.app = app;
    this.middlewares();
    this.routes();
    this.initializeServer();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(routes);
  }

  initializeServer() {
    this.app.listen(PORT_API, () => {
      console.log(`Server running on port ${PORT_API}`);
    });
  }
}

module.exports = new Server();
