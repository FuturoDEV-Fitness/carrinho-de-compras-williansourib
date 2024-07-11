const Database = require("../../../database/config/Database");

module.exports.createOrderItem = async (req, res) => {
  const { order_id, product_id, amount, price } = req.body;

  try {
    const result = await Database.query(
      "INSERT INTO order_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [order_id, product_id, amount, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating order item:", err.message);
    res.status(500).json({ error: "Failed to create order item." });
  }
};
