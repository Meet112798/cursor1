(function () {
  "use strict";

  if (window.matchMedia("(pointer: coarse)").matches) return;

  const style = document.createElement("style");
  style.textContent = [
    "body.cursor-magnetic-on{cursor:none}",
    ".cursor-magnetic{position:fixed;left:0;top:0;width:16px;height:16px;border-radius:50%;background:#0a0a0a;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%)}",
    ".cursor-magnetic::after{content:'';position:absolute;inset:-12px;border:1.5px solid rgba(0,0,0,.5);border-radius:50%;transform:scale(1);transition:transform .2s,border-color .2s}"
  ].join("");
  document.head.appendChild(style);
  document.body.classList.add("cursor-magnetic-on");

  const cursor = document.createElement("div");
  cursor.className = "cursor-magnetic";
  document.body.appendChild(cursor);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;
  let stuck = false;

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  const targets = Array.from(document.querySelectorAll("a,button,[role='button'],.magnetic"));
  targets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      tx = cx + dx * 0.35;
      ty = cy + dy * 0.35;
      stuck = true;
      cursor.style.background = "#ff6a00";
      cursor.style.setProperty("--s", "1.6");
      el.style.transform = "translate(" + dx * 0.08 + "px," + dy * 0.08 + "px)";
    });

    el.addEventListener("mouseleave", () => {
      stuck = false;
      cursor.style.background = "#0a0a0a";
      el.style.transform = "";
    });
  });

  function frame() {
    const speed = stuck ? 0.23 : 0.16;
    x += (tx - x) * speed;
    y += (ty - y) * speed;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
    const scale = stuck ? 1.25 : 1;
    cursor.style.transform = "translate(-50%,-50%) scale(" + scale + ")";
    requestAnimationFrame(frame);
  }

  frame();
})();
