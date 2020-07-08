const puppeteer = require('puppeteer')

main()

async function main() {
  const browser = await puppeteer.launch({
    args: [
      // all related chromium flags I could find
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--override-plugin-power-saver-for-testing=never',
      '--disable-extensions-http-throttling',
    ],
    headless: false
  })
  const timeout = 5000
  const page = await browser.newPage()
  for (let i = 0; i < 10; i++) {
    console.log(`navigating ${i}`)
    await page.goto('https://google.com', {timeout})
    const input = await page.$('input[type="text"]')
    await input.type('test')
    await Promise.all([
      page.waitForNavigation({timeout}),
      page.evaluate(() => document.querySelector('input[type="submit"]').click())
    ])
  }
}
