const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://books.toscrape.com/";

(async () => {
  const response = await axios(url);
  const $ = cheerio.load(response.data);
  const books = $("article");
  books.each(function a() {
    const title = $(this).find("h3 a").text();
    console.log(title);
  });
})();
