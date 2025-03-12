const bcrypt = require("bcryptjs");
const db = require("../../config/db");

const register = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { username, email, password } = req.body.user;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", register: false });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        register: false,
      });
    }

    const checkquery = "SELECT * FROM users WHERE username=?";
    //Check if username already exists
    db.query(checkquery, [username], async (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error Occurred", register: false });
      }

      if (result.length > 0) {
        return res
          .status(400)
          .json({ message: "Username already exists", register: false });
      }
      //Hash password
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query =
          "INSERT INTO users (username, email, hashedpassword) VALUES (?, ?, ?)";
        const values = [username, email, hashedPassword];
        //Register user
        db.query(query, values, (err, results) => {
          if (err) {
            console.error("Database Error:", err.message || err);
            return res.status(500).json({
              message: "Database error, please try again",
              register: false,
            });
          }
          console.log("User registered successfully");
          return res.status(200).json({
            message: "User registered successfully",
            register: true,
          });
        });
      } catch (error) {
        console.error("Error in hashing password:", error);
        return res
          .status(500)
          .json({ message: "Server error", register: false });
      }
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Server error", register: false });
  }
};

module.exports = register;
