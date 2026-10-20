const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/hangout', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'hangout_desktop_verify.png' });
  console.log('Saved hangout_desktop_verify.png');

  // Also test clicking Watch Together to open the in-development modal
  const watchCard = await page.$('div[class*="border-[#7655FF]"]');
  if (watchCard) {
    await watchCard.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'hangout_modal_verify.png' });
    console.log('Saved hangout_modal_verify.png');
  }

  await browser.close();
})();
