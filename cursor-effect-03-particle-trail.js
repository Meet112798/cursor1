(function () {
  "use strict";

  if (window.matchMedia("(pointer: coarse)").matches) return;

  const style = document.createElement("style");
  style.textContent = [
    "body.cursor-particle-on{cursor:none}",
    ".cursor-particle-core{position:fixed;left:0;top:0;width:7px;height:7px;background:#111;border-radius:50%;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%)}",
    ".cursor-particle{position:fixed;left:0;top:0;width:6px;height:6px;border-radius:50%;pointer-events:none;z-index:2147483646;transform:translate(-50%,-50%)}"
  ].join("");
  document.head.appendChild(style);
  document.body.classList.add("cursor-particle-on");

  const core = document.createElement("div");
  core.className = "cursor-particle-core";
  document.body.appendChild(core);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let lx = mx;
  let ly = my;

  const colors = ["#ff3d00", "#ffd600", "#00c853", "#00b0ff", "#d500f9"];

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    core.style.left = mx + "px";
    core.style.top = my + "px";

    const dist = Math.hypot(mx - lx, my - ly);
    if (dist < 6) return;

    const p = document.createElement("div");
    p.className = "cursor-particle";
    p.style.left = mx + "px";
    p.style.top = my + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(p);

    const dx = (Math.random() - 0.5) * 26;
    const dy = (Math.random() - 0.5) * 26;

    p.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: 0.95 },
      { transform: "translate(" + dx + "px," + dy + "px) scale(0)", opacity: 0 }
    ], {
      duration: 520,
      easing: "ease-out"
    });

    setTimeout(() => p.remove(), 560);
    lx = mx;
    ly = my;
  });
})();
