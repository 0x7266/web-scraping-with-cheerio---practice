const fs = require("fs");
const axios = require("axios");
const { load } = require("cheerio");
const url = "https://crossfit.com/workout/";
const wods = [];

const d = new Date();
let currentMonth = d.getMonth();
let currentYear = d.getFullYear();
let month = 0; // 0 = january, 1 = february, (...), 11 = december
let year = 2022;

async function getWod(url) {
  try {
    console.log(url);
    const { data } = await axios(url);
    data.wods.map((w, i) => {
      wods.push({
        id: w.cleanID,
        title: w.title,
        wod: w.wodRaw,
        createdAt: w.publishedOn,
      });
    });
    // console.log(wods.sort((a, b) => parseInt(a.id) - parseInt(b.id)));
    // fs.writeFileSync(
    //   "./data/crossfit.json",
    //   JSON.stringify(wods.sort((a, b) => b.createdAt - a.createdAt))
    // );
  } catch (error) {
    console.error(error.message);
  }
}

(async function run() {
  if (year <= currentYear) {
    if (year === currentYear && month > currentMonth + 1) {
      console.log(year);
      console.log(month);
      console.log("Not found");
      return;
    }
    if (month < 12) {
      await getWod(
        `${url}${year}/${
          (month + 1).toString().length === 1 ? `0${month + 1}` : month + 1
        }`
      );
      if (year === currentYear && month > currentMonth + 1) {
        return;
      }
      month++;
      await run();
    }
    while (year < currentYear) {
      year++;
      month = 0;
      await run();
    }
  }
  console.log(wods.length);
  fs.writeFileSync(
    "./data/wods.json",
    JSON.stringify({ count: wods.length, wods })
  );
})();
