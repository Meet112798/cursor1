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

  const points = [];
  addEventListener('mousemove', (e) => {
    points.push({ x: e.clientX, y: e.clientY, a: 1 });
    if (points.length > 50) points.shift();
  });

  (function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const prev = points[i - 1];
      p.a *= 0.97;
      ctx.strokeStyle = 'rgba(0,220,255,' + (p.a * i / points.length) + ')';
      ctx.lineWidth = 1 + (i / points.length) * 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  })();
})();
