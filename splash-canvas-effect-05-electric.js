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

  const bolts = [];
  addEventListener('mousemove', (e) => {
    const t = 3;
    for (let i = 0; i < t; i++) {
      bolts.push({
        x1: e.clientX,
        y1: e.clientY,
        x2: e.clientX + (Math.random() - 0.5) * 80,
        y2: e.clientY + (Math.random() - 0.5) * 80,
        a: 0.9
      });
    }
    if (bolts.length > 120) bolts.splice(0, bolts.length - 120);
  });

  (function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = bolts.length - 1; i >= 0; i--) {
      const b = bolts[i];
      b.a *= 0.9;
      ctx.strokeStyle = 'rgba(120,180,255,' + b.a + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      const mx = (b.x1 + b.x2) / 2 + (Math.random() - 0.5) * 20;
      const my = (b.y1 + b.y2) / 2 + (Math.random() - 0.5) * 20;
      ctx.lineTo(mx, my);
      ctx.lineTo(b.x2, b.y2);
      ctx.stroke();
      if (b.a < 0.05) bolts.splice(i, 1);
    }
    requestAnimationFrame(draw);
  })();
})();
