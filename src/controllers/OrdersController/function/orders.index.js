const Database = require("../../../database/config/Database");

module.exports.findAllOrders = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const result = await Database.query(
        `
        SELECT o.id, o.total, o.address, o.observations, c.name AS client_name, c.email AS client_email
        FROM orders o
        INNER JOIN clients c ON o.client_id = c.id
        WHERE o.id = $1
      `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json(result.rows[0]);
    } else {
      const result = await Database.query(`
        SELECT o.id, o.total, o.address, o.observations, c.name AS client_name, c.email AS client_email
        FROM orders o
        INNER JOIN clients c ON o.client_id = c.id
      `);

      return res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};
