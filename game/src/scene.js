// The lighthouse cove at dusk, drawn twice from the same code.
// drawScene(ctx, variant) paints one panel: variant 0 is the left picture,
// variant 1 is the right picture, and the seven differences live in the
// small branches marked DIFFERENCE below. Everything is fixed shapes and
// gradients — no randomness — so both panels and every load are identical.
import { PANEL_W, PANEL_H } from './differences.js';

function star(ctx, x, y, s) {
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? s : s * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function gull(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x - s, y);
  ctx.quadraticCurveTo(x - s * 0.4, y - s * 0.7, x, y);
  ctx.quadraticCurveTo(x + s * 0.4, y - s * 0.7, x + s, y);
  ctx.stroke();
}

function boat(ctx, x, y, sailColour) {
  ctx.fillStyle = '#7a4a21';
  ctx.beginPath();
  ctx.moveTo(x - 34, y);
  ctx.lineTo(x + 34, y);
  ctx.lineTo(x + 24, y + 14);
  ctx.lineTo(x - 24, y + 14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a2c10';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 40);
  ctx.stroke();
  ctx.fillStyle = sailColour;
  ctx.beginPath();
  ctx.moveTo(x + 3, y - 38);
  ctx.lineTo(x + 3, y - 4);
  ctx.lineTo(x + 28, y - 4);
  ctx.closePath();
  ctx.fill();
}

function crab(ctx, x, y) {
  ctx.fillStyle = '#e2543e';
  ctx.beginPath();
  ctx.ellipse(x, y, 11, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x - 14, y - 6, 5, 0, Math.PI * 2);
  ctx.arc(x + 14, y - 6, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2b1c34';
  ctx.beginPath();
  ctx.arc(x - 4, y - 3, 1.8, 0, Math.PI * 2);
  ctx.arc(x + 4, y - 3, 1.8, 0, Math.PI * 2);
  ctx.fill();
}

export function drawScene(ctx, variant) {
  const W = PANEL_W;
  const H = PANEL_H;
  // Dusk sky.
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.72);
  sky.addColorStop(0, '#241a4d');
  sky.addColorStop(0.55, '#7a3d6e');
  sky.addColorStop(1, '#e8875a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Stars (fixed positions).
  ctx.fillStyle = '#ffeec2';
  const stars = [[40, 36], [110, 60], [180, 28], [330, 40], [392, 74], [486, 96]];
  for (const [sx, sy] of stars) star(ctx, sx, sy, 6);
  // DIFFERENCE 'star': the right picture is missing the star at (448, 46).
  if (variant === 0) star(ctx, 448, 46, 8);

  // Moon, top left.
  ctx.fillStyle = '#f7e8b0';
  ctx.beginPath();
  ctx.arc(64, 108, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#54386b';
  ctx.beginPath();
  ctx.arc(78, 98, 22, 0, Math.PI * 2);
  ctx.fill();

  // Seagulls.
  ctx.strokeStyle = '#f4e9d8';
  ctx.lineWidth = 2.5;
  gull(ctx, 168, 66, 13);
  gull(ctx, 356, 122, 10);
  // DIFFERENCE 'gull': the right picture has one extra gull at (118, 88).
  if (variant === 1) gull(ctx, 118, 88, 12);

  // Sea.
  const sea = ctx.createLinearGradient(0, H * 0.66, 0, H);
  sea.addColorStop(0, '#2e6f8e');
  sea.addColorStop(1, '#173f5e');
  ctx.fillStyle = sea;
  ctx.fillRect(0, 292, W, H - 292);
  ctx.strokeStyle = 'rgba(255,220,170,0.5)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    const wy = 312 + i * 24;
    ctx.beginPath();
    ctx.moveTo(24 + (i % 2) * 30, wy);
    ctx.lineTo(96 + (i % 2) * 30, wy);
    ctx.moveTo(330 - (i % 2) * 24, wy + 6);
    ctx.lineTo(420 - (i % 2) * 24, wy + 6);
    ctx.stroke();
  }

  // Sandy shore in front.
  ctx.fillStyle = '#d9a05f';
  ctx.beginPath();
  ctx.moveTo(0, 392);
  ctx.quadraticCurveTo(W * 0.4, 372, W, 396);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Rocky point the lighthouse stands on.
  ctx.fillStyle = '#4c3a55';
  ctx.beginPath();
  ctx.moveTo(168, 300);
  ctx.quadraticCurveTo(260, 208, 352, 300);
  ctx.closePath();
  ctx.fill();

  // Lighthouse body.
  ctx.fillStyle = '#f2ead8';
  ctx.fillRect(238, 118, 44, 108);
  // DIFFERENCE 'stripe': the middle stripe is red on the left, blue on the right.
  ctx.fillStyle = '#c93b4a';
  ctx.fillRect(238, 132, 44, 16);
  ctx.fillStyle = variant === 0 ? '#c93b4a' : '#2e6fb0';
  ctx.fillRect(238, 170, 44, 16);
  ctx.fillStyle = '#c93b4a';
  ctx.fillRect(238, 208, 44, 16 - 6);
  // Lamp room.
  ctx.fillStyle = '#2b1c34';
  ctx.fillRect(232, 92, 56, 28);
  // DIFFERENCE 'lamp': the lamp glows amber on the left, dark on the right.
  if (variant === 0) {
    const glow = ctx.createRadialGradient(260, 104, 2, 260, 104, 30);
    glow.addColorStop(0, 'rgba(255,205,90,0.95)');
    glow.addColorStop(1, 'rgba(255,205,90,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(228, 72, 64, 64);
    ctx.fillStyle = '#ffcf5a';
  } else {
    ctx.fillStyle = '#3a3049';
  }
  ctx.fillRect(250, 96, 20, 16);
  ctx.fillStyle = '#2b1c34';
  ctx.beginPath();
  ctx.moveTo(226, 92);
  ctx.lineTo(294, 92);
  ctx.lineTo(260, 74);
  ctx.closePath();
  ctx.fill();
  // Door.
  ctx.fillStyle = '#5a3a1e';
  ctx.fillRect(252, 196, 16, 30);

  // Cottage on the right shore.
  ctx.fillStyle = '#8a5a34';
  ctx.fillRect(368, 288, 74, 48);
  ctx.fillStyle = '#5d2f35';
  ctx.beginPath();
  ctx.moveTo(358, 290);
  ctx.lineTo(452, 290);
  ctx.lineTo(405, 258);
  ctx.closePath();
  ctx.fill();
  // DIFFERENCE 'cottage': the cottage window is lit on the left, dark on the right.
  ctx.fillStyle = variant === 0 ? '#ffd76a' : '#33283f';
  ctx.fillRect(394, 288, 16, 16);
  ctx.strokeStyle = '#3a2415';
  ctx.lineWidth = 2;
  ctx.strokeRect(394, 288, 16, 16);
  ctx.fillStyle = '#3a2415';
  ctx.fillRect(420, 302, 14, 34);

  // DIFFERENCE 'boat': the boat sits further right in the right picture.
  boat(ctx, variant === 0 ? 118 : 178, 348, '#f6efdd');

  // DIFFERENCE 'crab': the crab is only on the left beach.
  if (variant === 0) crab(ctx, 74, 402);

  // A bucket and spade, same in both, near the cottage path.
  ctx.fillStyle = '#2e8f86';
  ctx.fillRect(452, 398, 18, 14);
  ctx.fillStyle = '#e8b13c';
  ctx.fillRect(478, 392, 5, 20);

  // Pebbles and a shell on the sand — identical dressing in both pictures,
  // there to reward a careful eye without ever being a difference.
  ctx.fillStyle = '#b57e42';
  ctx.beginPath();
  ctx.ellipse(180, 416, 9, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(316, 424, 7, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f2d8c9';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(238, 410, 6, Math.PI * 0.15, Math.PI * 0.85, true);
  ctx.stroke();

  // Panel border.
  ctx.strokeStyle = '#17102a';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, W - 4, H - 4);
}
