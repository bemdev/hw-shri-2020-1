const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

it('header render correct', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = { width: 1838 , height: 124 } //1838  x  124
  
  // This is well explained in the API
  await page.setViewport({
    width: options.width,
    height: options.height
  });

  await page.goto('http://localhost:3000/blocks/header');

  const image = await page.screenshot();
  await browser.close();
  
  expect.extend({ toMatchImageSnapshot });
  expect(image).toMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent'
  });

});