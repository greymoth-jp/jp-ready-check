# jp-ready-check

**A 5-second Japan-market-readiness scan for any URL — one command, no install, score out of 5.**

[![npm](https://img.shields.io/npm/v/jp-ready-check?color=BB1133&label=npm)](https://www.npmjs.com/package/jp-ready-check)
[![license](https://img.shields.io/badge/license-MIT-111111)](./LICENSE)
![no install](https://img.shields.io/badge/install-none-23502f)

Foreign SaaS and dev-tools quietly lose Japanese users long before it shows up in analytics — the `ja` locale exists but nothing points to it, there's no 特商法 page, pricing is USD-only, and the site is invisible in Japanese search. This checks five of those signals in one fetch, so you find the gap before a Japanese buyer silently bounces.

## Quickstart

```bash
npx jp-ready-check your-site.com
```

That's it — no install, no account, no API key. It fetches the page once and prints a score out of 5 with the specific gaps. (Same thing, straight from source: `npx github:greymoth-jp/jp-ready-check your-site.com`.)

## What it checks

| Signal | Why it matters |
|---|---|
| `hreflang="ja"` | Without it, Google.co.jp / Yahoo! Japan can't reliably surface your Japanese pages. |
| Japanese locale path / switcher | If the `ja` content exists but nothing links to it, Japanese users never reach it. |
| 特商法 (Tokushoho) page | The expected legal disclosure for selling in Japan. Its absence reads as "not really set up to sell here." |
| JPY pricing | USD-only pricing reads as "you are not our market." |
| Japanese content | Whether any Japanese text / `lang="ja"` is present on the page at all. |

## Example output

```
$ npx jp-ready-check notion.so

  jp-readiness of https://notion.so:  3 / 5

   ✓ hreflang ja
   ✓ ja locale path / switcher
   ✗ 特商法 (Tokushoho) page
       no 特商法 page — to a JP buyer its absence reads as "not set up to sell in Japan"
   ✗ JPY pricing
       no JPY pricing detected — USD reads as "you are not our market"
   ✓ Japanese content

  surface scan only — IME/CJK input bugs and funnel-deep localization need a runtime check.
```

Green is present, red is a gap with the reason spelled out. Exit code is always `0` on a successful fetch (the score is in the output, not the exit code).

## Limits (read these)

This is a **surface scan of one page's HTML**. It cannot see:

- **IME / CJK input bugs** — the most common real-world breakage (an Enter that confirms a Japanese conversion getting treated as submit). That needs a runtime test. ([what that bug looks like](https://github.com/nocodb/nocodb/issues/10394))
- whether your funnel actually *leads* a Japanese visitor to the `ja` content
- translation quality (machine-translated vs. something a buyer trusts)

A passing score is necessary, not sufficient.

## Deeper version

- **Every gap verified against your live site:** https://glovrex.com/check
- **An index of 13 open-source dev-tools scored on these dimensions, each gap linked to a real GitHub issue or URL:** https://jp-ready.glovrex.com

## License

MIT — use it, fork it, fold the checks into your own CI.

---

### Built by greymoth

19, Tokyo. I build small, honest dev tools in the open and file Japan-localization fixes into real OSS — and I publish what died, too.

**[Everything in one place → the hub](https://greymoth-jp.github.io)** · **[Live proof — merged PRs + App Store, pulled from the GitHub API →](https://greymoth-jp.github.io/proof-dashboard/)**

⭐ **[Follow on GitHub](https://github.com/greymoth-jp)** — every new tool ships as a public repo first, so a follow is a launch notification (no email, no algorithm).
