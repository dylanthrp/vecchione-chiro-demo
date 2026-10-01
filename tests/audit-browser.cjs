const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/dylan/Downloads/study-spot/node_modules/playwright');
const assert = require('node:assert/strict');
const { pathToFileURL, fileURLToPath } = require('node:url');
const path = require('node:path');
const fs = require('node:fs');
const ROOT = path.join(__dirname,'..');
const PAGES = fs.readdirSync(ROOT).filter(p=>p.endsWith('.html'));
(async () => {
 const browser = await chromium.launch({headless:true});
 let checks = 0;
 try {
  for (const width of [320,390,768,1440]) {
   const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[]; const external=[]; const failed=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
   page.on('request',r=>{if(/^https?:/.test(r.url())) external.push(r.url());});
   page.on('requestfailed',r=>failed.push(r.url()));
   for (const name of PAGES) {
    await page.goto(pathToFileURL(path.join(ROOT,name)).href);
    assert.equal(await page.locator('main').count(),1,`${name}: main`);
    assert.equal(await page.locator('h1').count(),1,`${name}: h1`);
    assert.equal(await page.locator('.topnav [aria-current]').count(),1,`${name}: current section`);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, nofollow');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('class'),'skip-link');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'),'main');
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name} ${width}: overflow`);
    if(width < 540) {
     assert.ok((await page.locator('header.top').boundingBox()).height<=116,`${name}: compact mobile header <=116px`);
     const links=await page.locator('.topnav a').all();
     if(name==='index.html' && width===390) {
      await page.evaluate(()=>window.scrollTo(0,0));
      assert.ok((await page.locator('.hero .portrait').boundingBox()).y < 800, 'Mobile portrait begins within first 800px');
     }
     const boxes=await Promise.all(links.map(a=>a.boundingBox()));
     assert.ok(boxes.every(b=>Math.abs(b.y-boxes[0].y)<2),`${name}: mobile navigation in one row`);
    }
    for(const link of await page.locator('.topnav a, .header-icons a').all()) {
     const box=await link.boundingBox();
     assert.ok(box.height>=44,`${name}: navigation touch target >=44px`);
    }
    for(const img of await page.locator('img').all()) {
     await img.scrollIntoViewIfNeeded();
     await img.evaluate(el=>el.decode());
     assert.ok(await img.evaluate(el=>el.naturalWidth>0),'broken image');
    }
    for(const href of await page.locator('a[href]').evaluateAll(els=>els.map(e=>e.href))) {
     if(!href.startsWith('file:')) continue;
     const target = new URL(href); const fragment=decodeURIComponent(target.hash.slice(1)); target.hash='';
     const filename=fileURLToPath(target);
     assert.ok(fs.existsSync(filename),`${name}: missing destination ${filename}`);
     if(fragment) assert.ok(new RegExp(`id=["']${fragment}["']`).test(fs.readFileSync(filename,'utf8')),`${name}: missing anchor ${fragment}`);
    }
    assert.deepEqual(external,[],'unsolicited external requests');
    assert.deepEqual(errors,[],'console / page errors');
    assert.deepEqual(failed,[],'failed requests');
    await page.evaluate(()=>{document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'});});
    await page.screenshot({path:path.join(__dirname,`audit-${name.replace('.html','')}-${width}.png`),fullPage:true});
    if(name==='index.html') await page.screenshot({path:path.join(__dirname,`audit-home-viewport-${width}.png`)});
    checks++;
   }
   console.log(`PASS ${width}px: all ${PAGES.length} pages, links, images, accessibility basics, privacy, chrome`);
   await page.close();
  }
  console.log(`PASS ${checks} page/viewport combinations`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
