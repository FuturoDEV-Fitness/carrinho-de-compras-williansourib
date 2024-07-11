const Database = require("../../../database/config/Database");

module.exports.updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { order_id, product_id, amount, price } = req.body;

  try {
    const result = await Database.query(
      `UPDATE order_items 
       SET order_id = $1, product_id = $2, amount = $3, price = $4 
       WHERE id = $5 
       RETURNING *`,
      [order_id, product_id, amount, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order item not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating order item:", err.message);
    res.status(500).json({ error: "Failed to update order item." });
  }
};
