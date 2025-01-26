const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

const API_URL = "http://itgirlschool.justmakeit.ru/api/words";

app.all("/api/proxy", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: API_URL,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
