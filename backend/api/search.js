const axios = require('axios');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = req.query.q || '';
  const url = `https://www.zeptonow.com/api/v1/search?q=${encodeURIComponent(query)}&city=Bangalore`;

  try {
    const response = await axios.get(url);
    const products = response.data?.products || [];

    const simplified = products.map(p => ({
      title: p.name,
      image: p.image_url
    }));

    res.status(200).json(simplified);
  } catch (error) {
    console.error("Zepto API error:", error.message);
    res.status(500).json({ error: 'Failed to fetch Zepto data' });
  }
};
