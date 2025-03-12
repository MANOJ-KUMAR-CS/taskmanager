const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const secretKey = process.env.SECURITY_KEY || "491194";
    const decoded = verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
