const axios = require('axios');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = req.query.q || '';
  const url = `https://www.zeptonow.com/api/v1/search?q=${encodeURIComponent(query)}&city=Bangalore`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "x-platform": "web",
        "accept": "application/json"
      }
    });

    const products = response.data?.products || [];

    const simplified = products.map(p => ({
      title: p.name,
      image: p.image_url
    }));

    res.status(200).json(simplified);
  } catch (error) {
    console.error("Zepto API error:", error.message);
    res.status(500).json({ error: "Failed to fetch Zepto data" });
  }
};
