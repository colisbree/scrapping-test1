const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // démarre une instance de Chromium
  const page = await browser.newPage();
  await page.goto("https://www.imdb.com/list/ls567407355/");

  // côté chromium => le traitement scrapping s'effectuera ci-après
  const movies = await page.evaluate(() => {
    let movies = [];
    let elements = document.querySelectorAll("div.lister-item");
    for (let element of elements) {
      movies.push({
        img: element.querySelector("img.loadlate")?.src,
        title: element.querySelector("h3.lister-item-header a")?.text.trim(),
        time: element.querySelector("span.runtime")?.textContent,
      });
    }
    return movies;
  });
  // fin scrapping

  console.log(movies);
  await browser.close();
})();
