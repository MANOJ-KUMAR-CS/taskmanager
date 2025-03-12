const db = require("../../config/db");

const get = (req, res) => {
  const { userid } = req.params; 

  if (!userid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = "SELECT * FROM data WHERE userid = ?"; // Use userid, not id

  db.query(query, [userid], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Can't get task", error: err});
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Task found", tasks: results }); // Return as "tasks"
    }

    return res.status(404).json({ message: "No tasks found" });
  });
};

module.exports = get;
