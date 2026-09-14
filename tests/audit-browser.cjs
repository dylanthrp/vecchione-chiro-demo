const { chromium } = require('C:/Users/dylan/Downloads/study-spot/node_modules/playwright');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const fs = require('node:fs');
const PAGES = ['index.html','meet-the-doctor.html','services.html','conditions.html','library-index.html','library-back.html','library-neck.html','library-sciatica.html','library-headaches.html','library-carpal.html','library-joints.html','library-foot.html','library-auto.html','patient-resources.html'];
(async () => {
  const browser = await chromium.launch({headless:true});
  try {
    for (const width of [320,390,768,1440]) {
      const page = await browser.newPage({viewport:{width,height:900}, reducedMotion:'reduce'});
      const errors=[]; const external=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('request',r=>{if(/^https?:/.test(r.url())) external.push(r.url());});
      await page.goto(pathToFileURL(path.join(__dirname,'../index.html')).href);
      assert.equal(await page.locator('main').count(),1,'missing main landmark');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('class'),'skip-link');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'),'main');
      assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} horizontal overflow`);
      for(const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(el=>el.decode());
        assert.ok(await img.evaluate(el=>el.naturalWidth>0),'broken image');
      }
      assert.deepEqual(external,[],'unsolicited third-party requests');
      assert.deepEqual(errors,[]);
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      await page.screenshot({path:path.join(__dirname,`audit-${width}.png`),fullPage:true});
      console.log(`PASS ${width}px home`);
      await page.close();
    }
    // per-page link integrity (topnav pages + footer pages must be linked)
    const home = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
    const topnavPages = ['index.html','meet-the-doctor.html','services.html','library-index.html','patient-resources.html'];
    const allPages = topnavPages.concat(['library-back.html','library-neck.html','library-sciatica.html','library-headaches.html','library-carpal.html','library-joints.html','library-foot.html','library-auto.html']);
    // every page should link back to the topnav pages (topnav appears on every page)
    for (const p of allPages) {
      const page = fs.readFileSync(path.join(__dirname,'..',p),'utf8');
      for (const t of topnavPages) {
        assert.ok(page.includes(`href="${t}"`) || page.includes(`href="index.html#top"`), `${p} missing link to ${t}`);
      }
    }
    // conditions section lives on home (#conditions anchor)
    assert.ok(home.includes('id="conditions"'), 'home missing #conditions section');
    console.log(`PASS link integrity: ${allPages.length} pages, topnav links everywhere`);
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
