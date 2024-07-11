const Database = require("../../../database/config/Database");

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, amount, color, voltage, description, category_id } = req.body;

  try {
    const result = await Database.query(
      `UPDATE products 
       SET name = $1, amount = $2, color = $3, voltage = $4, description = $5, category_id = $6 
       WHERE id = $7 
       RETURNING *`,
      [name, amount, color, voltage, description, category_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ error: "Failed to update product." });
  }
};
