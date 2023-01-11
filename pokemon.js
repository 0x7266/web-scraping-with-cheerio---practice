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

let totalPages = async () => {
  try {
    const response = await getData(url);
    const $ = cheerio.load(response);
    const lastPage = $("nav > ul").find("li").eq(-2).text();
    return 2;
  } catch (error) {
    console.error(error);
  }
};

(async function run() {
  try {
    if (page > (await totalPages())) {
      console.log("Can't find this page");
      return;
    }
    let response;
    page === 1
      ? (response = await getData(url))
      : (response = await getData(url + `page/${page}`));
    const $ = cheerio.load(response);
    $(".products li").each((i, e) => {
      const image = $(e).find("a img").attr("src");
      const name = $(e).find("a h2").text();
      const price = $(e).find(".price").text();
      pokemons.push({ id: i + 1, name, image, price });
    });
    if (page === (await totalPages())) {
      console.log(pokemons);
      fs.writeFileSync("./data/pokemons.json", JSON.stringify(pokemons));
      return;
    }
    page++;
    run();
    // console.log(pokemons);
  } catch (error) {
    console.error(error.message);
  }
})();

// (async function run() {
//   try {
//     let response;
//     page === 1
//       ? (response = await getData(url))
//       : (response = await getData(url + `page/${page}`));
//     const $ = cheerio.load(response);
//     const list = $(".products li");
//     const totalPages = $("nav > ul").find("li").eq(-2).text();
//     if (page > totalPages) {
//       return;
//     }
//     console.log(page);
//     list.each((index, element) => {
//       const image = $(element).find("a img").attr("src");
//       const name = $(element).find("a h2").text();
//       const price = $(element).find(".price").text();
//       pokemons.push({ image, name, price });
//       console.log("page");
//     });
//     page++;
//     await run();
//     fs.writeFileSync("./data/pokemons.json", JSON.stringify(pokemons));
//     console.log("a");
//   } catch (error) {
//     console.error(error);
//   }
// })();
