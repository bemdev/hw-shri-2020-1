const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

it('page index renders correct', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = { width: 1838 , height: 1403 }
  
  // This is well explained in the API
  await page.setViewport({
    width: options.width,
    height: options.height
  });

  await page.goto('http://localhost:3000/index');

  const image = await page.screenshot();
  await browser.close();
  
  expect.extend({ toMatchImageSnapshot });
  expect(image).toMatchImageSnapshot({
    failureThreshold: 0.0017,
    failureThresholdType: 'percent'
  });

});

it('page mobile index renders correct', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = { width: 800, height: 3401 }
  
  // This is well explained in the API
  await page.setViewport({
    width: options.width,
    height: options.height
  });

  await page.goto('http://localhost:3000/index');

  const image = await page.screenshot();
  await browser.close();
  
  expect.extend({ toMatchImageSnapshot });
  expect(image).toMatchImageSnapshot({
    failureThreshold: 0.0017,
    failureThresholdType: 'percent'
  });

});