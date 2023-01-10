const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://scrapeme.live/shop/";
let page = 1;
const pokemons = [];

const getData = async (url) => {
  const { data } = await axios(url);
  return data;
};

(async function run() {
  try {
    let response;
    page === 1
      ? (response = await getData(url))
      : (response = await getData(url + `page/${page}`));
    const $ = cheerio.load(response);
    const list = $(".products li");
    const totalPages = $("nav > ul").find("li").eq(-2).text();
    if (page > totalPages) {
      return;
    }
    console.log(totalPages);
    list.each((index, element) => {
      const image = $(element).find("a img").attr("src");
      const name = $(element).find("a h2").text();
      const price = $(element).find(".price").text();
      pokemons.push({ image, name, price });
    });
    page++;
    run();
    fs.writeFileSync("pokemons.json", JSON.stringify(pokemons));
  } catch (error) {
    console.error(error);
  }
})();
