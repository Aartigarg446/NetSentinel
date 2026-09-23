const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "host.docker.internal",
  user: "root",
  password: "NetSentinel@123",
  database: "netsentinel"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("MySQL database connected successfully");
});

module.exports = db;