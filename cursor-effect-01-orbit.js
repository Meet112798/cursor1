(function () {
  "use strict";

  if (window.matchMedia("(pointer: coarse)").matches) return;

  const style = document.createElement("style");
  style.textContent = [
    "body.cursor-orbit-on{cursor:none}",
    ".cursor-orbit-dot,.cursor-orbit-ring,.cursor-orbit-sat{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%)}",
    ".cursor-orbit-dot{width:8px;height:8px;border-radius:50%;background:#111}",
    ".cursor-orbit-ring{width:34px;height:34px;border:2px solid rgba(17,17,17,.8);border-radius:50%;transition:width .2s,height .2s,border-color .2s}",
    ".cursor-orbit-sat{width:6px;height:6px;border-radius:50%;background:#ff4d4d;mix-blend-mode:multiply}",
    "a.cursor-orbit-hover,button.cursor-orbit-hover,[role='button'].cursor-orbit-hover{cursor:none}"
  ].join("");
  document.head.appendChild(style);
  document.body.classList.add("cursor-orbit-on");

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  const sat = document.createElement("div");
  dot.className = "cursor-orbit-dot";
  ring.className = "cursor-orbit-ring";
  sat.className = "cursor-orbit-sat";
  document.body.append(dot, ring, sat);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let angle = 0;
  let boost = 0;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  document.querySelectorAll("a,button,[role='button']").forEach((el) => {
    el.classList.add("cursor-orbit-hover");
    el.addEventListener("mouseenter", () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "#ff4d4d";
      boost = 1;
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "34px";
      ring.style.height = "34px";
      ring.style.borderColor = "rgba(17,17,17,.8)";
      boost = 0;
    });
  });

  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    angle += 0.12 + boost * 0.08;
    const radius = 18 + boost * 10;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    sat.style.left = rx + Math.cos(angle) * radius + "px";
    sat.style.top = ry + Math.sin(angle) * radius + "px";
    requestAnimationFrame(tick);
  }

  tick();
})();
