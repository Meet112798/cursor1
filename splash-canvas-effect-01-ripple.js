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

  const rings = [];
  addEventListener('mousemove', (e) => {
    rings.push({ x: e.clientX, y: e.clientY, r: 2, a: 0.7 });
    if (rings.length > 120) rings.shift();
  });

  (function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = rings.length - 1; i >= 0; i--) {
      const p = rings[i];
      p.r += 1.8;
      p.a *= 0.965;
      ctx.strokeStyle = 'rgba(255,80,40,' + p.a + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.stroke();
      if (p.a < 0.03) rings.splice(i, 1);
    }
    requestAnimationFrame(draw);
  })();
})();
