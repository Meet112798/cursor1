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

  const blobs = [];
  addEventListener('mousemove', (e) => {
    blobs.push({ x: e.clientX, y: e.clientY, r: 22 + Math.random() * 24, a: 0.35 + Math.random() * 0.2 });
    if (blobs.length > 60) blobs.shift();
  });

  (function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = blobs.length - 1; i >= 0; i--) {
      const b = blobs[i];
      b.r *= 0.985;
      b.a *= 0.97;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, 'rgba(255,0,128,' + b.a + ')');
      g.addColorStop(0.5, 'rgba(0,200,255,' + b.a * 0.8 + ')');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      if (b.a < 0.03) blobs.splice(i, 1);
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  })();
})();
