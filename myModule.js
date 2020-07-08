const puppeteer = require('puppeteer');

//utiliser la variable 'data' comme tu veux...
function findData( data ) {
  return new Promise( async resolve => {
    
    //code d'example du scraping
    //changer pour ce que tu vas faire
    const url = 'https://youtube.com/';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});

    //take screenshot
    await page.screenshot({path: 'tahaEstCon.png'});

    //wait to display the element
    await page.waitForXPath("(//*[@id='video-title'])[1]");

    let elHandle = await page.$x("(//*[@id='video-title'])[1]");

    let text = await page.evaluate(el => el.textContent, elHandle[0]);

    await browser.close();
    resolve(text);
  });
}

//ici on a les fonctions que le module va exporter
module.exports = {
  findData,
}
