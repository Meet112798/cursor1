(function () {
  "use strict";

  if (window.matchMedia("(pointer: coarse)").matches) return;

  const style = document.createElement("style");
  style.textContent = [
    "body.cursor-spotlight-on{cursor:none}",
    ".cursor-spotlight{position:fixed;left:0;top:0;width:220px;height:220px;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle, rgba(255,255,255,.28) 0%, rgba(255,255,255,.1) 35%, rgba(255,255,255,0) 70%);mix-blend-mode:screen;transition:width .2s,height .2s}",
    ".cursor-spotlight-cross{position:fixed;left:0;top:0;width:26px;height:26px;pointer-events:none;z-index:2147483648;transform:translate(-50%,-50%)}",
    ".cursor-spotlight-cross::before,.cursor-spotlight-cross::after{content:'';position:absolute;left:50%;top:50%;background:#fff;opacity:.9;transform:translate(-50%,-50%)}",
    ".cursor-spotlight-cross::before{width:18px;height:1.5px}",
    ".cursor-spotlight-cross::after{width:1.5px;height:18px}"
  ].join("");
  document.head.appendChild(style);
  document.body.classList.add("cursor-spotlight-on");

  const light = document.createElement("div");
  const cross = document.createElement("div");
  light.className = "cursor-spotlight";
  cross.className = "cursor-spotlight-cross";
  document.body.append(light, cross);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  document.querySelectorAll("a,button,[role='button'],img,h1,h2").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      light.style.width = "280px";
      light.style.height = "280px";
    });
    el.addEventListener("mouseleave", () => {
      light.style.width = "220px";
      light.style.height = "220px";
    });
  });

  function animate() {
    x += (tx - x) * 0.15;
    y += (ty - y) * 0.15;
    light.style.left = x + "px";
    light.style.top = y + "px";
    cross.style.left = x + "px";
    cross.style.top = y + "px";
    requestAnimationFrame(animate);
  }

  animate();
})();
