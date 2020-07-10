const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const url = 'https://youtube.com/';

app.get('/retourPuppeteer', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  //take screenshot
  await page.screenshot({path: 'tahaEstCon.png'});

  //wait to display the element
  await page.waitForXPath("(//*[@id='video-title'])[1]");

  let elHandle = await page.$x("(//*[@id='video-title'])[1]");

  let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

  await browser.close();

  res.send(lamudiNewPropertyCount);
});


app.get('/accueil', async (req, res) => {
res.sendFile('paccueil_view.html', {root: __dirname })}
);


app.get('/action', async (req, res) => {
res.json({test : req.query.test})
});



app.listen(8081, () => console.log('listening bitch'));
