const Database = require("../../../database/config/Database");

module.exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Database.query(
      `
      DELETE FROM orders 
      WHERE id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "Order deleted successfully" });
    }
    return res.status(404).json({ error: "Order not found" });
  } catch (err) {
    console.error("Error deleting order:", err.message);
    res.status(500).json({ error: "Failed to delete order." });
  }
};
