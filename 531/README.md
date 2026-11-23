# 5/3/1 Tracker

A small web app version of my Wendler 5/3/1 spreadsheet ("Bigger Sol 2026"). It runs entirely in the browser, so it can be hosted for free on GitHub Pages.

- **Train**: this week's sessions with set weights, plate loading per side, an AMRAP rep counter with live estimated 1RM, Boring But Big sets and notes.
- **Plan**: the whole cycle at a glance, training max per lift (editable to reset a lift), add or remove cycles.
- **Progress**: estimated 1RM per session against training max, per-cycle table, body weight and strength-to-weight ratio.
- **Settings**: start date, TM %, BBB %, rounding, bar and plates, lifts and increments, sync, backup and CSV export.

The math matches the original sheet: TM = 90% of 1RM, +increment per cycle, week percentages 65/75/85, 70/80/90, 75/85/95, deload 40/50/60, rounded to the nearest 5 lbs, Brzycki estimate from the AMRAP set.

## Where it lives

Live at **https://sollee1106.github.io/stuffs/531/**, published by GitHub Pages from the `gh-pages` branch of this repo.

On iPhone, open that address in Safari, tap **Share → Add to Home Screen**. It then opens full screen like an app and keeps working with no signal at the gym.

## Your data

- Everything you log is saved in the browser on that device (local storage). Nothing is sent anywhere unless you turn on sync.
- The app starts with the numbers from the Google Sheet already loaded. This repository is public, so those starting numbers are visible to anyone who reads `index.html`. Your later logs are not in the repository.
- **Settings → Backup** downloads a JSON backup, restores one, or exports a CSV you can paste back into Google Sheets.

## Sync between phone and computer (optional)

1. Create a GitHub token with only the **gist** permission: <https://github.com/settings/tokens/new?scopes=gist&description=5%2F3%2F1%20tracker>. Pick an expiration you're comfortable with.
2. In the app, go to **Settings → Sync across devices**, paste the token and tap **Connect**. The app creates one secret gist called `531-tracker-data.json` on your account.
3. Do the same on each device. They all find that gist and stay in sync automatically.

Each logged session carries its own timestamp, so logging on two devices merges cleanly. The token is stored only on that device and is only sent to `api.github.com`.

## Updating the app

Replace `531/index.html` on the `gh-pages` branch. The service worker checks the network first, so the new version shows up the next time the app is opened online. If you add new files that should work offline, add them to `ASSETS` in `sw.js` and bump `CACHE` (for example `t531-v2`).

## Credits

Program math from Jon K's Wendler 5/3/1 Spreadsheet v1.3. Not affiliated with Jim Wendler. Barlow Condensed font by The Barlow Project Authors, SIL Open Font License 1.1.
