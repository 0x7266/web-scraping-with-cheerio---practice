const fs = require("fs");
const axios = require("axios");
// const { load } = require("cheerio");
const url = "https://crossfit.com/workout/";
const wods = [];

const d = new Date();
let currentMonth = d.getMonth() + 1;
let currentYear = d.getFullYear();
let month = 10;
let year = 2022;

async function getWod(url) {
  try {
    console.log(url);
    const { data } = await axios(url);
    data.wods.map((w, i) => {
      const year = w.cleanID.slice(0, 4);
      const month = w.cleanID.slice(4, 6);
      const day = w.cleanID.slice(6);
      wods.push({
        id: w.cleanID,
        title: w.title,
        wod: w.wodRaw,
        date: { year, month, day },
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

(async function run() {
  if (year <= currentYear) {
    if (month <= 12) {
      await getWod(
        `${url}${year}/${month.toString().length === 1 ? `0${month}` : month}`
      );
      month++;
      if (year === currentYear && month > currentMonth) {
        console.log(year);
        console.log(month);
        console.log(wods.length);
        console.log("All wods already scraped");
        fs.writeFileSync(
          "./data/wods.json",
          JSON.stringify({
            count: wods.length,
            wods: wods.sort((a, b) => parseInt(a.id) - parseInt(b.id)),
          })
        );
        return;
      }
      await run();
    }
    year++;
    month = 1;
    await run();
  }
})();
