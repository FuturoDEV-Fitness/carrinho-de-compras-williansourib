const Database = require("../../../database/config/Database");

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Database.query("DELETE FROM products WHERE id = $1 ", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "Product deleted successfully" });
    }
    return res.status(404).json({ error: "Product not found" });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product." });
  }
};
