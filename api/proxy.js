export default async function handler(req, res) {
  console.log("Received request at proxy:", req.method);
  console.log("Request body:", req.body);

  const API_URL = "http://itgirlschool.justmakeit.ru/api/words";

  try {
    const response = await axios({
      method: req.method,
      url: API_URL,
      data: req.body,
    });

    console.log("Response from external API:", response.data);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy request failed:", error.message);

    res.status(500).json({
      error: "Proxy request failed",
      details: error.message,
    });
  }
}
