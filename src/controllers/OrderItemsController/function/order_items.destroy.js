const Database = require("../../../database/config/Database");

module.exports.deleteOrderItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Database.query(
      "DELETE FROM order_items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "Order item deleted successfully" });
    }
    return res.status(404).json({ error: "Order item not found" });
  } catch (err) {
    console.error("Error deleting order item:", err.message);
    res.status(500).json({ error: "Failed to delete order item." });
  }
};
