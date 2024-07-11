require("dotenv").config();
const { Pool } = require("pg");

class Database {
  constructor() {
    this.database = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DB_PORT,
    });
  }

  async query(text, params) {
    const client = await this.database.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }
}

module.exports = new Database();
