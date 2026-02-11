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

  const particles = [];
  addEventListener('mousemove', (e) => {
    for (let i = 0; i < 4; i++) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        s: 3 + Math.random() * 4,
        a: 1,
        c: ['#ff3366', '#ffd166', '#06d6a0', '#118ab2'][Math.floor(Math.random() * 4)]
      });
    }
    if (particles.length > 280) particles.splice(0, particles.length - 280);
  });

  (function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.a *= 0.96;
      p.s *= 0.985;
      ctx.fillStyle = p.c.replace(')', ',' + p.a + ')');
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, p.s, p.s);
      if (p.a < 0.05 || p.s < 0.8) particles.splice(i, 1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  })();
})();
