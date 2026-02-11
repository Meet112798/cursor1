(function () {
  const canvas = document.querySelector('.splash-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const root = document.querySelector('.splash-bg') || canvas;

  function fit() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    root.style.position = 'fixed';
    root.style.inset = '0';
    root.style.pointerEvents = 'none';
    root.style.zIndex = '20';
  }

  fit();
  addEventListener('resize', fit);

  let mx = innerWidth * 0.5;
  let my = innerHeight * 0.5;
  let cx = mx;
  let cy = my;
  let time = 0;

  const sparks = [];

  addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    for (let i = 0; i < 3; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 30 + Math.random() * 80;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(a) * sp * 0.02,
        vy: Math.sin(a) * sp * 0.02,
        life: 1,
        size: 1 + Math.random() * 2.2
      });
    }

    if (sparks.length > 260) sparks.splice(0, sparks.length - 260);
  });

  function drawRuneRing(x, y, r, t, dir, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t * dir);

    ctx.strokeStyle = 'rgba(255,150,40,' + alpha + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    const glyphs = 18;
    for (let i = 0; i < glyphs; i++) {
      const ang = (i / glyphs) * Math.PI * 2;
      const gx = Math.cos(ang) * r;
      const gy = Math.sin(ang) * r;
      const len = 8 + Math.sin(t * 2 + i) * 2;

      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(ang + t * 0.6);
      ctx.strokeStyle = 'rgba(255,210,120,' + (alpha * 0.9) + ')';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-len * 0.5, 0);
      ctx.lineTo(len * 0.5, 0);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  function drawEnergyArcs(x, y, r, t) {
    const arcs = 7;
    for (let i = 0; i < arcs; i++) {
      const base = (i / arcs) * Math.PI * 2 + t * 1.7;
      const spread = 0.22 + Math.sin(t * 2.2 + i) * 0.08;

      ctx.strokeStyle = 'rgba(255,120,30,0.55)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(x, y, r + 14 + Math.sin(t * 3 + i) * 4, base, base + spread);
      ctx.stroke();
    }
  }

  function drawCenterGlow(x, y, r) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,220,150,0.36)');
    g.addColorStop(0.42, 'rgba(255,130,40,0.25)');
    g.addColorStop(1, 'rgba(255,80,20,0)');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSparks() {
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.99;
      s.vy *= 0.99;
      s.life *= 0.965;

      ctx.fillStyle = 'rgba(255,190,90,' + s.life + ')';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      if (s.life < 0.05) sparks.splice(i, 1);
    }
  }

  function frame() {
    time += 0.016;
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'lighter';

    const baseR = 64;
    drawCenterGlow(cx, cy, baseR + 34);
    drawRuneRing(cx, cy, baseR, time, 1, 0.9);
    drawRuneRing(cx, cy, baseR + 18, time * 0.8, -1, 0.65);
    drawRuneRing(cx, cy, baseR - 16, time * 1.2, -1, 0.55);
    drawEnergyArcs(cx, cy, baseR, time);
    drawSparks();

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }

  frame();
})();
