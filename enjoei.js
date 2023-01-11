const axios = require("axios");
const { load } = require("cheerio");
const url =
  "https://enjoei.com.br/vans/s?ref=products_search&sid=302b1774-a220-4dd5-9246-0cdf642ee283-1673360997756&q=vans&d=rapazes&st[ss]=40";
let products = [];

(async function run() {
  try {
    const { data } = await axios(url);
    const $ = load(data);
    const a = $(".c-product-card__img").attr();
    console.log(a);

    // list.each((i, e) => {
    //   const image = $(e).find(".c-product-card > div a img");
    //   console.log(image);
    // });
  } catch (error) {
    console.error(error.message);
  }
})();
