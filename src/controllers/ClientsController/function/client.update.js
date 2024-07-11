const Database = require("../../../database/config/Database");

module.exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, cpf, contact } = req.body;
  try {
    const result = await Database.query(
      "UPDATE clients SET name = $1, email = $2, cpf = $3, contact = $4 WHERE id = $5 RETURNING *",
      [name, email, cpf, contact, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
