# Twin Picture Hunt — The Lighthouse Cove

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/blupoint44/twin-picture-hunt/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/blupoint44/twin-picture-hunt/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

A spot-the-difference game drawn entirely in code: a lighthouse cove at dusk —
gradient sky, crescent moon, a striped lighthouse, a cottage, a little boat and
a sandy shore — rendered twice side by side on one canvas. The two pictures
look the same, but seven details differ. All art is hand-written canvas 2D
(shapes and gradients, no images, no libraries, no network), and the scene is
fully deterministic: every load shows exactly the same cove.

## The 7 differences

1. A missing star in the top-right sky
2. The lighthouse lamp — glowing amber vs dark
3. An extra seagull in the right picture
4. The lighthouse's middle stripe — red vs blue
5. The little boat has moved along the water
6. A cottage window — lit vs dark
7. A missing crab on the beach

## How to play

- Click or tap a difference in **either** picture: it is ringed in green on
  **both** pictures and the "to find" counter drops.
- A wrong click flashes a red X and adds to the miss counter.
- **H** (or the Hint button) pulses an amber ring around the next unfound
  difference. **R** (or Restart) starts over.
- Find all 7 to win: an overlay celebrates and shows your time.

Screenshot / demo states via URL query: `?state=start` (nothing found),
`?state=mid` (3 differences pre-found, 4 to find), `?state=won` (all found,
win overlay). See `shots.json`.

## How to run

```sh
node serve.ts          # serves game/ at http://localhost:8080
```

or serve the `game/` folder with any static file server and open
`game/index.html`. To hand the entry in the make.fun way:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Entered via make.fun — referral code cc9ads3n
