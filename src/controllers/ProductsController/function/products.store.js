const Database = require("../../../database/config/Database");

module.exports.createProduct = async (req, res) => {
  const { name, amount, color, voltage, description, category_id } = req.body;
  try {
    const result = await Database.query(
      "INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, amount, color, voltage, description, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
