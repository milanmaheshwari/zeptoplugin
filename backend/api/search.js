const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = req.query.q || '';
  const url = `https://www.zeptonow.com/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const products = [];

    $('[data-testid="ProductCard"]').each((_, el) => {
      const title = $(el).find('h2').text().trim();
      const image = $(el).find('img').attr('src');
      if (title && image) products.push({ title, image });
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Scraper error:', error.message);
    res.status(500).json({ error: 'Scraping failed' });
  }
};
