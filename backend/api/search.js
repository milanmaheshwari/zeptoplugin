import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow from Figma

  const query = req.query.q || '';
  try {
    const response = await axios.get(`https://www.zeptonow.com/search?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(response.data);
  
    const products = [];
    $('[data-testid="ProductCard"]').each((_, el) => {
      const title = $(el).find('h2').text();
      const image = $(el).find('img').attr('src');
      if (title && image) products.push({ title, image });
    });

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Zepto data" });
  }
}
