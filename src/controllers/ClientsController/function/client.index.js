const Database = require("../../../database/config/Database");

module.exports.findAllClients = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const result = await Database.query(
        "SELECT * FROM clients WHERE id = $1",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Client not found" });
      }
      return res.status(200).json(result.rows[0]);
    } else {
      const result = await Database.query("SELECT * FROM clients");
      return res.status(200).json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
