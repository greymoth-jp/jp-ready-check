# jp-ready-check

A 5-second **Japan-market-readiness** signal scan for any URL.

Foreign SaaS and dev-tools quietly lose Japanese users long before they show up in analytics — the `ja` locale exists but nothing points to it, there's no 特商法 page, pricing is USD-only, and the site is invisible in Japanese search. This is a quick surface check for five of those signals.

```bash
npx github:greymoth-jp/jp-ready-check your-site.com
```

No install. No account. It fetches the page once and reports a score out of five.

## What it checks

| Signal | Why it matters |
|---|---|
| `hreflang="ja"` | Without it, Google.co.jp / Yahoo! Japan can't reliably surface your Japanese pages. |
| Japanese locale path / switcher | If the `ja` content exists but nothing links to it, Japanese users never reach it. |
| 特商法 (Tokushoho) page | The expected legal disclosure for selling in Japan. Its absence reads as "not really set up to sell here." |
| JPY pricing | USD-only pricing reads as "you are not our market." |
| Japanese content | Whether any Japanese text / `lang="ja"` is present on the page at all. |

## Example

```
  jp-readiness of https://example.com:  2 / 5

   ✓ hreflang ja
   ✗ ja locale path / switcher
       no visible Japanese locale path or language switcher in the markup
   ✗ 特商法 (Tokushoho) page
       no 特商法 page — to a JP buyer its absence reads as "not set up to sell in Japan"
   ✓ JPY pricing
   ✗ Japanese content
       no Japanese text/lang detected on this page
```

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
