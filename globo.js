const axios = require("axios");
const { load } = require("cheerio");

const url = "https://globo.com";

(async function run() {
  const { data } = await axios(url);
  const $ = load(data);
  $(".highlight-container .post").each((i, e) => {
    const title = $(e).find(".post__title").text();
    const link = $(e).find(".post__link").attr("href");
    const image = $(e).find("a figure .post__image").attr("src");
    console.log({ id: i, title, link, image });
  });
})();
