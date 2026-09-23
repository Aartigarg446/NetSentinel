const express = require("express");
const cors = require("cors");

const { checkServer } = require("./services/monitorService");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "NetSentinel Backend Running"
  });
});

app.get("/api/monitor", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      message: "URL is required"
    });
  }

  const result = await checkServer(url);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});