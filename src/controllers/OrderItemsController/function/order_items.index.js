const Database = require("../../../database/config/Database");

module.exports.findAllOrderItems = async (req, res) => {
  const { id } = req.params;

  try {
    let query, result;

    if (id) {
      query = `
        SELECT 
          oi.id, oi.amount, oi.price, 
          o.id as order_id, o.client_id, o.total, o.address, o.observations, 
          c.id as client_id, c.name as client_name, c.email as client_email, c.cpf as client_cpf, c.contact as client_contact,
          p.id as product_id, p.name as product_name, p.amount as product_amount, p.color, p.voltage, p.description, 
          cat.id as category_id, cat.name as category_name
        FROM order_items oi
        INNER JOIN orders o ON oi.order_id = o.id
        INNER JOIN clients c ON o.client_id = c.id
        INNER JOIN products p ON oi.product_id = p.id
        INNER JOIN categories cat ON p.category_id = cat.id
        WHERE oi.id = $1
      `;
      result = await Database.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Order item not found" });
      }

      return res.status(200).json(result.rows[0]);
    } else {
      query = `
        SELECT 
          oi.id, oi.amount, oi.price, 
          o.id as order_id, o.client_id, o.total, o.address, o.observations, 
          c.id as client_id, c.name as client_name, c.email as client_email, c.cpf as client_cpf, c.contact as client_contact,
          p.id as product_id, p.name as product_name, p.amount as product_amount, p.color, p.voltage, p.description, 
          cat.id as category_id, cat.name as category_name
        FROM order_items oi
        INNER JOIN orders o ON oi.order_id = o.id
        INNER JOIN clients c ON o.client_id = c.id
        INNER JOIN products p ON oi.product_id = p.id
        INNER JOIN categories cat ON p.category_id = cat.id
      `;
      result = await Database.query(query);

      return res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error("Error fetching order items:", err.message);
    res.status(500).json({ error: "Failed to fetch order items." });
  }
};
