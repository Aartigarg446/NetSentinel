const express = require("express");
const router = express.Router();
const db = require("../db");
const { checkServer } = require("../services/monitorService");

router.post("/servers", (req, res) => {
  const { name, url } = req.body;

  if (!name || !url) {
    return res.status(400).json({
      message: "Name and URL are required"
    });
  }

  const sql = "INSERT INTO servers (name, url) VALUES (?, ?)";

  db.query(sql, [name, url], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to add server"
      });
    }

    res.status(201).json({
      message: "Server added successfully",
      serverId: result.insertId
    });
  });
});
router.get("/test", (req, res) => {
  res.json({
    message: "Server routes are working"
  });
});
router.get("/servers", (req, res) => {
  const sql = "SELECT * FROM servers";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch servers"
      });
    }

    res.json(results);
  });
});
module.exports = router;