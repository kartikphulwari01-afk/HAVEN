const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Desktop resolution 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/hangout', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'hangout_desktop_verify.png' });
  console.log('Saved hangout_desktop_verify.png');

  // 2. Click Watch Together to test modal
  const watchCard = await page.$('div[class*="border-[#7655FF]"]');
  if (watchCard) {
    await watchCard.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'hangout_modal_verify.png' });
    console.log('Saved hangout_modal_verify.png');
    // Close modal
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
  }

  // 3. Narrower Laptop Viewport (1200x800)
  await page.setViewport({ width: 1200, height: 800 });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'hangout_laptop_verify.png' });
  console.log('Saved hangout_laptop_verify.png');

  await browser.close();
})();
