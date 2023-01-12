const fs = require("fs");
const axios = require("axios");
const { load } = require("cheerio");
const url = "https://crossfit.com/workout/";
const wods = [];

(async function run() {
  try {
    const { data } = await axios(url);
    // console.log(data.wods[0]);
    data.wods.map((w, i) => {
      wods.push({
        id: w.cleanID,
        title: w.title,
        wod: w.wodRaw,
        createdAt: w.publishedOn,
      });
    });
    console.log(wods.sort((a, b) => parseInt(a.id) - parseInt(b.id)));
    // fs.writeFileSync(
    //   "./data/crossfit.json",
    //   JSON.stringify(wods.sort((a, b) => b.createdAt - a.createdAt))
    // );
  } catch (error) {
    console.error(error.message);
  }
})();
