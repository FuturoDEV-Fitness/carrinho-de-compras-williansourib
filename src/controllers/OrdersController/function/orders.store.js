const Database = require("../../../database/config/Database");

module.exports.createOrders = async (req, res) => {
  const { client_id, total, address, observations, items } = req.body;

  try {
    await Database.query("BEGIN");

    const orderQuery = `
            INSERT INTO orders (client_id, total, address, observations)
            VALUES ($1, $2, $3, $4)
            RETURNING id
          `;
    const orderValues = [client_id, total, address, observations];
    const orderResult = await Database.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].id;

    for (let item of items) {
      const { product_id, amount, price } = item;
      const orderItemQuery = `
              INSERT INTO order_items (order_id, product_id, amount, price)
              VALUES ($1, $2, $3, $4)
            `;
      const orderItemValues = [orderId, product_id, amount, price];
      await Database.query(orderItemQuery, orderItemValues);
    }

    await Database.query("COMMIT");

    res.status(201).json({ message: "Order created successfully." });
  } catch (err) {
    await Database.query("ROLLBACK");
    console.error("Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order." });
  }
};
