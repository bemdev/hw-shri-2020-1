const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

it('page product renders correct', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = { width: 1920, height: 1250 } //1920 x  1247
  
  // This is well explained in the API
  await page.setViewport({
    width: options.width,
    height: options.height
  });

  await page.goto('http://localhost:3000/product');

  const image = await page.screenshot();
  await browser.close();
  
  expect.extend({ toMatchImageSnapshot });
  expect(image).toMatchImageSnapshot({
    failureThreshold: 0.01, //dont have original image
    failureThresholdType: 'percent'
  });

});

it('page product mobile renders correct', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = { width: 800, height: 2327 } //1920 x  1247
  
  // This is well explained in the API
  await page.setViewport({
    width: options.width,
    height: options.height
  });

  await page.goto('http://localhost:3000/product');

  const image = await page.screenshot();
  await browser.close();
  
  expect.extend({ toMatchImageSnapshot });
  expect(image).toMatchImageSnapshot({
    failureThreshold: 0.01, //dont have original image
    failureThresholdType: 'percent'
  });

});