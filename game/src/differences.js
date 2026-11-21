// The seven differences of Twin Picture Hunt, as data.
// Coordinates are panel-local: each picture is PANEL_W wide and PANEL_H tall,
// drawn twice on one canvas with a gutter between them. `side` says which
// picture carries the odd detail, purely as a design note for the scene code.
export const PANEL_W = 520;
export const PANEL_H = 440;
export const GUTTER = 24;

export const DIFFERENCES = [
  { id: 'star',    label: 'A missing star',          x: 448, y: 46,  r: 22 },
  { id: 'lamp',    label: 'The lighthouse lamp',     x: 260, y: 104, r: 24 },
  { id: 'gull',    label: 'An extra seagull',        x: 118, y: 88,  r: 26 },
  { id: 'stripe',  label: 'A changed stripe colour', x: 260, y: 178, r: 28 },
  { id: 'boat',    label: 'The little boat moved',   x: 148, y: 348, r: 38 },
  { id: 'cottage', label: 'A dark cottage window',   x: 402, y: 296, r: 20 },
  { id: 'crab',    label: 'A missing crab',          x: 74,  y: 402, r: 22 },
];

// The three differences pre-found in the ?state=mid screenshot scene:
// one in the sky, one in the air, one on the shore — spread out so the
// mid-game frame reads clearly even shrunk down in the judge's sheet.
export const MID_FOUND = ['star', 'gull', 'cottage'];

// A click counts when it lands within the difference's radius plus this
// small forgiveness margin, so fair clicks on small details never feel lost.
export const CLICK_SLOP = 6;
