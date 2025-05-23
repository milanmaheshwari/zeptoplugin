import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const query = req.query.q || '';
  const url = `https://www.zeptonow.com/search?q=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const products = [];
  $('[data-testid="ProductCard"]').each((_, el) => {
    const title = $(el).find('h2').text();
    const image = $(el).find('img').attr('src');
    if (title && image) products.push({ title, image });
  });

  res.status(200).json(products);
}
