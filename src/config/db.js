const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "491194",
  database: "userlogin",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error in connecting to database:", err);
  } else {
    console.log("Connected to database successfully");
    connection.release(); 
  }
});
module.exports = pool; 
