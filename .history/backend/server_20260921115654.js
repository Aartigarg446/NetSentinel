const express = require("express");
const serverRoutes = require("./routes/serverRoutes");
const { startMonitoring } = require("./services/monitorService");
console.log("serverRoutes object:", serverRoutes);
const cors = require("cors");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", serverRoutes);
app.get("/api/direct-test", (req, res) => {
  res.json({
    message: "Direct route is working"
  });
});
console.log("serverRoutes loaded");

app.get("/api/health", (req, res) => {
  res.json({
    message: "NetSentinel Backend Running"
  });
});
startMonitoring();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});