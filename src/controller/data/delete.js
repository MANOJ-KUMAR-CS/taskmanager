const db = require("../../config/db");

const deleteData = (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  const query = "DELETE FROM data WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Error deleting Task" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  });
};

module.exports = deleteData;
