const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://books.toscrape.com/";
let page = 1;
const books = [];
(async (url) => {
  try {
    const response = await axios(url);
    const $ = cheerio.load(response.data);
    console.log($);
    $("article").each(async (i, e) => {
      const title = $(e).find("h3 a").text();
      const image = url + $(e).find(".thumbnail").attr("src");
      const price = $(e).find(".price_color").text();
      books.push({ id: i + 1, title, image, price });
    });
    console.log(books);

    fs.writeFileSync("./data/books.json", JSON.stringify(books));
  } catch (error) {
    console.error(error.message);
  }
})(url);
