const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const pages = fs.readdirSync(root).filter(p => p.endsWith('.html'));
for (const name of pages) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  assert.ok(!/data-status-pill|Checking hours|Open now|10a–1p/.test(html), `${name}: remove misleading live/stale hours`);
  for (const [, href] of html.matchAll(/href="(tel:[^"]+)"/g)) assert.equal(href, 'tel:+13132771100', `${name}: phone integrity`);
  assert.ok(!/scientifically-validated|brain-body communication|where many whole-body issues originate|One precise result|Sinus &amp; allergies|Mood swings|gentle enough for any age/.test(html), `${name}: unsupported clinical claim`);
  assert.ok(!html.includes('\\ '), `${name}: escaped spaces shown as text`);
  assert.ok(html.includes('hosting provider'), `${name}: accurate hosting privacy disclosure`);
  assert.ok(html.includes('branding are unapproved'), `${name}: unapproved preview disclosure`);
}
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
for (const name of ['index.html', 'patient-resources.html']) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  assert.ok(!/1st, 3rd|first, third|9:00 AM/.test(html), `${name}: remove unsupported schedule`);
  assert.ok(html.includes('10:00 AM – 1:00 PM'), `${name}: published morning hours`);
  assert.ok(html.includes('3:00 PM – 7:00 PM'), `${name}: published afternoon hours`);
  assert.ok(html.includes('3:00 PM – 6:00 PM'), `${name}: Wednesday hours`);
  assert.ok(html.includes('not listed'), `${name}: do not invent unlisted hours`);
}
assert.ok(readme.includes('https://dylanthrp.github.io/vecchione-chiro-demo/'), 'README preview URL');
console.log(`PASS content/phone/disclosure checks on ${pages.length} pages`);
