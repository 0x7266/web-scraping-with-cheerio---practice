const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://old.reddit.com/r/unixporn/";
const posts = [];

(async function run() {
  try {
    const { data } = await axios(url);
    const $ = cheerio.load(data);
    $(".thing").each(async (i, e) => {
      const title = $(e).find("h3").text();
      console.log(title);
    });
  } catch (error) {
    console.error(error.message);
  }
})();
