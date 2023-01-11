const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://old.reddit.com/r/unixporn/new";
const posts = [];

async function getDetails(path) {
  const url = `https://old.reddit.com/${path}`;
  const { data } = await axios(url);
  const $ = cheerio.load(data);
  return $("a.post-link").attr("href");
}

(async function run() {
  try {
    const { data } = await axios(url);
    const $ = cheerio.load(data);
    $(".thing.linkflair.link").each(async (i, e) => {
      const title = $(e)
        .find(".entry.unvoted .top-matter .title .title")
        .text();
      const user = $(e)
        .find(".entry.unvoted .top-matter .tagline .author")
        .text();
      const profile_link = `https://old.reddit.com/user/${user}`;
      const path = $(e).find("a").attr("href");
      // const thumbail = $(e).find("a img").attr("src");
      const image = await getDetails(path);
      console.log({ title, image, user: { user, profile_link } });
    });
  } catch (error) {
    console.error(error.message);
  }
})();
