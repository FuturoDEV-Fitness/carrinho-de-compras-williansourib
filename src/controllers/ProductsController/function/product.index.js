const Database = require("../../../database/config/Database");

module.exports.findAllProducts = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    if (id && isNaN(id)) {
      const err = new Error("Id needs to be an INTEGER");
      err.status = 400;
      throw err;
    }

    let query, result;

    if (id) {
      query = `
        SELECT p.id, p.name, p.amount, p.color, p.voltage, p.description, 
               c.id as category_id, c.name as category_name
        FROM products p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1
      `;

      result = await Database.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(result.rows[0]);
    } else {
      query = `
      SELECT p.id, p.name, p.amount, p.color, p.voltage, p.description, 
             c.id as category_id, c.name as category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
    `;
      result = await Database.query(query);

      res.status(200).json(result.rows);
    }
  } catch (err) {
    // Handle errors
    return res.status(err.status || 500).send({ error: err.message });
  }
};
