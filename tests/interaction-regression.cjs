const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/dylan/Downloads/study-spot/node_modules/playwright');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const url = name => process.env.BASE_URL
 ? new URL(name, process.env.BASE_URL).href
 : pathToFileURL(path.join(__dirname, '..', name)).href;
(async () => {
 const browser = await chromium.launch({headless:true});
 try {
  for (const width of [320,390,768,1440]) {
   const page = await browser.newPage({viewport:{width,height:900}});
   await page.goto(url('patient-resources.html'));
   assert.ok(await page.locator('.faq details').count() >= 4, 'Native patient FAQs are present');
   for (const detail of await page.locator('.faq details').all()) {
    await detail.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await detail.evaluate(el => el.open), true, 'Enter opens FAQ');
    await page.keyboard.press('Space');
    assert.equal(await detail.evaluate(el => el.open), false, 'Space closes FAQ');
   }
   await page.goto(url('library-index.html'));
   assert.equal(await page.getByLabel('Search the library').count(),1,'Library search is available');
   const search = page.getByLabel('Search the library');
   const cards = page.locator('[data-library] .lib-card:visible');
   assert.equal(await cards.count(),8);
   await search.fill('  SCIATICA  ');
   assert.equal(await cards.count(),1);
   assert.match(await cards.first().innerText(), /Sciatica/);
   await page.getByLabel('Filter by topic').selectOption('head-neck');
   assert.equal(await cards.count(),0);
   assert.equal(await page.locator('[data-empty]').isVisible(),true);
   await page.getByRole('button',{name:'Reset filters'}).click();
   assert.equal(await cards.count(),8);
   assert.equal(await search.inputValue(),'');
   await page.getByLabel('Filter by topic').selectOption('head-neck');
   assert.equal(await cards.count(),2);
   assert.match(await page.locator('[data-results]').innerText(),/2 of 8/);
   await search.fill('<img src=x>');
   assert.equal(await cards.count(),0);
   assert.equal(await page.locator('[data-library] img').count(),0);
   await page.getByRole('button',{name:'Reset filters'}).click();
   await page.locator('[data-library] .lib-card').first().click();
   assert.ok(page.url().endsWith('library-back.html'));
   await page.close();
   console.log(`PASS FAQ and library interactions ${width}px`);
  }
  const page = await browser.newPage({javaScriptEnabled:false});
  await page.goto(url('patient-resources.html'));
  await page.locator('.faq summary').first().click();
  assert.equal(await page.locator('.faq details').first().evaluate(el=>el.open),true);
  await page.goto(url('library-index.html'));
  assert.equal(await page.locator('[data-library] .lib-card:visible').count(),8);
  assert.equal(await page.locator('[data-library-tools]').isVisible(),false);
  await page.locator('[data-library] .lib-card').first().click();
  assert.ok(page.url().endsWith('library-back.html'));
  await page.close();
  console.log('PASS native FAQ and library fallback without JavaScript');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
