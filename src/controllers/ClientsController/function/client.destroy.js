const Database = require("../../../database/config/Database");

module.exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Database.query(
      "DELETE FROM clients WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(200).json({ message: "Client deleted successfully" });
    }
    return res.status(404).json({ error: "Client not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
