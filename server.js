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

app.post("/api/proxy/add", async (req, res) => {
  console.log("Add request received with body:", req.body);
  try {
    const response = await axios.post(`${API_URL}/add`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error in addWord:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/proxy/:id/delete", async (req, res) => {
  console.log("Delete request received for ID:", req.params.id);
  const { id } = req.params;
  try {
    const response = await axios.post(`${API_URL}/${id}/delete`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error in deleteWord:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/proxy/:id/update", async (req, res) => {
  console.log("Update request received for ID:", req.params.id);
  const { id } = req.params;
  try {
    const response = await axios.post(`${API_URL}/${id}/update`, req.body);
    console.log("Update response from API:", response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error in updateWord:", error.message);
    res.status(500).json({ error: error.message });
  }
});
