const Database = require("../../../database/config/Database");

module.exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { client_id, total, address, observations } = req.body;

  try {
    const result = await Database.query(
      `
      UPDATE orders 
      SET client_id = $1, total = $2, address = $3, observations = $4
      WHERE id = $5
      RETURNING *
    `,
      [client_id, total, address, observations, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating order:", err.message);
    res.status(500).json({ error: "Failed to update order." });
  }
};
