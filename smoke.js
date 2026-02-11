// ===== cursor smoke =====
if (window.innerWidth < 768) {
  // reduce particles for mobile
  PARTICLE_MULTIPLIER = 1;
}

const canvas = document.getElementById("smokeCursor");
if (canvas) {
  const ctx = canvas.getContext("2d");

  let w, h;
  let particles = [];
  let isTouch = "ontouchstart" in window;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;

  class SmokeParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 0.5 + 2;
      this.life = 1;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.hue = Math.random() * 360;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.02;
      this.size *= 0.97;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.life})`;
      ctx.shadowColor = `hsla(${this.hue}, 80%, 65%, ${this.life})`;
      ctx.shadowBlur = 20;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class GlowParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1;
      this.radius = 35;
    }

    update() {
      this.life -= 0.05;
      this.radius += 0.5;
    }

    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, `rgba(99,102,241,${this.life})`);
      gradient.addColorStop(1, "rgba(99,102,241,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (!isTouch) {
    window.addEventListener("mousemove", (e) => {
      for (let i = 0; i < 3; i++) {
        particles.push(new SmokeParticle(e.clientX, e.clientY));
      }
    });
  } else {
    window.addEventListener(
      "touchmove",
      (e) => {
        const t = e.touches[0];
        particles.push(new GlowParticle(t.clientX, t.clientY));
      },
      { passive: true }
    );
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    particles = particles.filter((p) => p.life > 0);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}