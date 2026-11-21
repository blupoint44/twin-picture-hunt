// Twin Picture Hunt — game logic: clicks, markers, misses, hints, timer, win.
// Screenshot states come from the URL: ?state=start|mid|won (the starter's
// ?shot=start|play|end spelling is accepted too, mapped onto the same scenes).
import { DIFFERENCES, MID_FOUND, CLICK_SLOP, PANEL_W, PANEL_H, GUTTER } from './differences.js';
import { drawScene } from './scene.js';

const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const counterEl = document.getElementById('counter');
const missesEl = document.getElementById('misses');
const timeEl = document.getElementById('time');
const bannerEl = document.getElementById('banner');

const TOTAL_W = PANEL_W * 2 + GUTTER;
const found = new Set();
let misses = 0;
let startedAt = performance.now();
let finishedMs = null;
let missMark = null; // {x, y, panel, until}
let hintId = null;
let hintUntil = 0;

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function remaining() {
  return DIFFERENCES.length - found.size;
}

function applyState() {
  const q = new URLSearchParams(location.search);
  const state = q.get('state') || { start: 'start', play: 'mid', end: 'won' }[q.get('shot')] || 'start';
  found.clear();
  misses = 0;
  finishedMs = null;
  startedAt = performance.now();
  if (state === 'mid') {
    for (const id of MID_FOUND) found.add(id);
    startedAt = performance.now() - 42000;
  } else if (state === 'won') {
    for (const d of DIFFERENCES) found.add(d.id);
    finishedMs = 83000;
    misses = 2;
  }
}

function panelOrigin(panel) {
  return panel === 0 ? 0 : PANEL_W + GUTTER;
}

function drawMarker(panel, d) {
  const cx = panelOrigin(panel) + d.x;
  const cy = d.y;
  ctx.strokeStyle = '#37e08b';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, d.r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(10,40,24,0.85)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, d.r + 4, 0, Math.PI * 2);
  ctx.stroke();
}

function draw(now) {
  ctx.clearRect(0, 0, TOTAL_W, PANEL_H);
  for (let panel = 0; panel < 2; panel += 1) {
    ctx.save();
    ctx.translate(panelOrigin(panel), 0);
    ctx.beginPath();
    ctx.rect(0, 0, PANEL_W, PANEL_H);
    ctx.clip();
    drawScene(ctx, panel);
    ctx.restore();
  }
  for (const d of DIFFERENCES) {
    if (found.has(d.id)) {
      drawMarker(0, d);
      drawMarker(1, d);
    }
  }
  // Hint pulse: an expanding amber ring around one unfound difference.
  if (hintId && now < hintUntil) {
    const d = DIFFERENCES.find((it) => it.id === hintId);
    const phase = 1 - (hintUntil - now) / 1400;
    for (let panel = 0; panel < 2; panel += 1) {
      ctx.strokeStyle = '#ffcf5a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(panelOrigin(panel) + d.x, d.y, d.r + 6 + phase * 16, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  // Miss flash: a red X where the player clicked wrongly.
  if (missMark && now < missMark.until) {
    const x = panelOrigin(missMark.panel) + missMark.x;
    const y = missMark.y;
    ctx.strokeStyle = '#ff5468';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x - 11, y - 11);
    ctx.lineTo(x + 11, y + 11);
    ctx.moveTo(x + 11, y - 11);
    ctx.lineTo(x - 11, y + 11);
    ctx.stroke();
  }
  const won = remaining() === 0;
  if (won) {
    ctx.fillStyle = 'rgba(16,10,34,0.72)';
    ctx.fillRect(0, PANEL_H / 2 - 52, TOTAL_W, 104);
    ctx.fillStyle = '#ffe9a8';
    ctx.font = '700 40px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('You found all 7 differences!', TOTAL_W / 2, PANEL_H / 2 - 4);
    ctx.font = '400 22px Georgia, serif';
    ctx.fillStyle = '#f4e9d8';
    ctx.fillText(`Finished in ${fmt(finishedMs ?? performance.now() - startedAt)} — press R to play again`, TOTAL_W / 2, PANEL_H / 2 + 34);
  }
  counterEl.textContent = `${remaining()} to find`;
  missesEl.textContent = `Misses: ${misses}`;
  timeEl.textContent = `Time: ${fmt(finishedMs ?? now - startedAt)}`;
  bannerEl.textContent = won ? `All 7 found in ${fmt(finishedMs ?? now - startedAt)}!` : '';
  requestAnimationFrame(draw);
}

function pick(cx, cy) {
  if (remaining() === 0) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (cx - rect.left) * scaleX;
  const y = (cy - rect.top) * scaleY;
  let panel = -1;
  let localX = x;
  if (x < PANEL_W) panel = 0;
  else if (x >= PANEL_W + GUTTER) { panel = 1; localX = x - PANEL_W - GUTTER; }
  if (panel === -1 || y < 0 || y > PANEL_H) return;
  const hit = DIFFERENCES.find((d) => !found.has(d.id)
    && Math.hypot(localX - d.x, y - d.y) <= d.r + CLICK_SLOP);
  if (hit) {
    found.add(hit.id);
    if (remaining() === 0) finishedMs = performance.now() - startedAt;
  } else {
    misses += 1;
    missMark = { x: localX, y, panel, until: performance.now() + 650 };
  }
}

canvas.addEventListener('pointerdown', (ev) => pick(ev.clientX, ev.clientY));

function restart() {
  found.clear();
  misses = 0;
  finishedMs = null;
  missMark = null;
  hintId = null;
  startedAt = performance.now();
}

function hint() {
  const open = DIFFERENCES.filter((d) => !found.has(d.id));
  if (open.length === 0) return;
  hintId = open[0].id;
  hintUntil = performance.now() + 1400;
}

window.addEventListener('keydown', (ev) => {
  if (ev.key === 'r' || ev.key === 'R') restart();
  if (ev.key === 'h' || ev.key === 'H') hint();
});
document.getElementById('restart').addEventListener('click', restart);
document.getElementById('hint').addEventListener('click', hint);

applyState();
requestAnimationFrame(draw);
