const db = require("../../config/db");
const alter = (req, res) => {
    const { id } = req.params;
    const query = "UPDATE data SET completed=? WHERE id=?";
    db.query(query, [req.body.completed,id], (error, result) => {
        if (error) { 
            return res.status(500).json({ message: "Error in updating " });
        }
        res.json({ message: "Updated successfully" });
    })
}
module.exports=alter;