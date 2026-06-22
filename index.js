#!/usr/bin/env node
// jp-ready-check — a 5-second Japan-market-readiness signal scan for any URL.
//   npx github:greymoth-jp/jp-ready-check <url>
// Surface scan only (the deep, verified version is at glovrex.com/check).
const arg = process.argv[2];
if (!arg || arg === '-h' || arg === '--help') {
  console.log('usage: npx github:greymoth-jp/jp-ready-check <url>');
  process.exit(arg ? 0 : 1);
}
const target = /^https?:\/\//.test(arg) ? arg : 'https://' + arg;

const checks = [
  { key: 'hreflang ja', test: h => /hreflang=["']ja/i.test(h),
    gap: 'no <link hreflang="ja"> — Google.co.jp / Yahoo! Japan can\'t surface your Japanese pages' },
  { key: 'ja locale path / switcher', test: h => /href=["'][^"']*\/ja[\/"']|lang=["']ja/i.test(h),
    gap: 'no visible Japanese locale path or language switcher in the markup' },
  { key: '特商法 (Tokushoho) page', test: h => /特定商取引|特商法|tokushoho/i.test(h),
    gap: 'no 特商法 page — to a JP buyer its absence reads as "not set up to sell in Japan"' },
  { key: 'JPY pricing', test: h => /[¥￥]|\bJPY\b|円(?![満])/.test(h),
    gap: 'no JPY pricing detected — USD reads as "you are not our market"' },
  { key: 'Japanese content', test: h => /lang=["']ja|[぀-ヿ一-龯]/.test(h),
    gap: 'no Japanese text/lang detected on this page' },
];

(async () => {
  let html = '';
  try {
    const r = await fetch(target, { headers: { 'User-Agent': 'jp-ready-check' }, redirect: 'follow', signal: AbortSignal.timeout(12000) });
    html = await r.text();
  } catch (e) {
    console.log('\ncould not fetch ' + target + ': ' + (e && e.message ? e.message : e) + '\n');
    process.exit(1);
  }
  const results = checks.map(c => ({ key: c.key, pass: c.test(html), gap: c.gap }));
  const score = results.filter(r => r.pass).length;
  console.log('\n  jp-readiness of ' + target + ':  ' + score + ' / 5\n');
  for (const r of results) {
    console.log('   ' + (r.pass ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m') + ' ' + r.key + (r.pass ? '' : '\n       ' + r.gap));
  }
  console.log('\n  surface scan only — IME/CJK input bugs and funnel-deep localization need a runtime check.');
  console.log('  deep version, every gap verified against your live site:  https://glovrex.com/check');
  console.log('  index of scored OSS dev-tools (Cal.com, Medusa, Strapi …):  https://jp-ready.glovrex.com\n');
})();
