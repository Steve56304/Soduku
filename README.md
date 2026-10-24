# Sudoku (offline)

An offline-capable build of the Sudoku web app by Grant McLean, as used on
[SudokuExchange.com](https://sudokuexchange.com).

Original source: https://github.com/grantm/sudoku-web-app
Licence: GNU Affero General Public License v3 or later (see the original repository).

## What was changed
Only offline support was added; the app itself is unchanged.
- `source-changes/offline-changes.patch` — changes to the original source
  (registers a service worker, renames the Home Screen app, iOS meta tags)
- `source-changes/sw.js` — the service worker that caches the app
- `source-changes/finish-sw.js` — post-build script that fills in the cache list

## Use
Open the site in Safari, Share → Add to Home Screen, then open it once from the
Home Screen icon while online. After that it works with no connection:
tap "Enter a new puzzle", type the givens, tap Start.
