const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const login = (req, res) => {
  const query = "SELECT * FROM users WHERE username = ?";
  const { username, password } = req.body.user;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Missing credentials", verified: false });
  }
  //Finding user in database
  db.query(query, [username], async (err, result) => {
    if (err) {
      console.error("Database error during login:", err);
      return res
        .status(500)
        .json({ message: "Error while logging in", verified: false});
    }

    if (result.length === 0) {
      console.log("User not found");
      return res
        .status(404)
        .json({ message: "User not found", verified: false });
    }

    //Hashed password from database
    try {
      const hashedPassword = result[0].hashedpassword;
      const match = await bcrypt.compare(password, hashedPassword);

      if (!match) {
        console.log("Incorrect password");
        return res
          .status(401)
          .json({ message: "Invalid password", verified: false });
      }

      const id = result[0].userid;
      const user = { username, id };
      const securityKey = process.env.JWT_SECRET || "default_secret"; // Use env variable for security
      const token = jwt.sign(user, securityKey, { expiresIn: "1h" });

      // Set token in cookie
      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // Security enhancement
      });


      return res
        .status(200)
        .json({ id, message: "Login successful", verified: true });
    } catch (error) {
      console.error("Error during password verification:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", verified: false });
    }
  });
};

module.exports = login;
