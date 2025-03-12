const db = require("../../config/db");

const update = (req, res) => {
  const { id } = req.params;
  const { heading, date, content } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Task ID is required" });
  }
  if (!heading || !date || !content) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const query =
    "UPDATE data SET heading = ?, date = ?, content = ? WHERE id = ?";

  db.query(query, [heading, date, content, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error: Can't update data", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No such task  found" });
    }
    res.json({ message: "Updated successfully" });
  });
};

module.exports = update;
