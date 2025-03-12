const db = require("../../config/db");

const add = (req, res) => {
  const { userid } = req.params;
  const { heading, date, content } = req.body;

  const query =
    "INSERT INTO data (userid, heading, date, content) VALUES (?, ?, ?, ?)";
  const params = [userid, heading, date, content];

  db.query(query, params, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to add Task", error: err });
    }
    return res
      .status(201)
      .json({ message: "Task added successfully", insertId: result.insertId });
  });
};

module.exports = add;
