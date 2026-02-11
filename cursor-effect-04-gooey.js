(function () {
  "use strict";

  if (window.matchMedia("(pointer: coarse)").matches) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("style", "position:absolute;width:0;height:0");
  svg.innerHTML = "<filter id='cursor-goo'><feGaussianBlur in='SourceGraphic' stdDeviation='6' result='b'/><feColorMatrix in='b' mode='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 25 -8' result='g'/><feBlend in='SourceGraphic' in2='g'/></filter>";
  document.body.appendChild(svg);

  const style = document.createElement("style");
  style.textContent = [
    "body.cursor-goo-on{cursor:none}",
    ".cursor-goo-wrap{position:fixed;inset:0;pointer-events:none;z-index:2147483647;filter:url(#cursor-goo)}",
    ".cursor-goo-a,.cursor-goo-b{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}",
    ".cursor-goo-a{width:34px;height:34px;background:#0f172a}",
    ".cursor-goo-b{width:20px;height:20px;background:#22c55e;mix-blend-mode:multiply}"
  ].join("");
  document.head.appendChild(style);
  document.body.classList.add("cursor-goo-on");

  const wrap = document.createElement("div");
  wrap.className = "cursor-goo-wrap";
  const a = document.createElement("div");
  const b = document.createElement("div");
  a.className = "cursor-goo-a";
  b.className = "cursor-goo-b";
  wrap.append(a, b);
  document.body.appendChild(wrap);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let ax = mx;
  let ay = my;
  let bx = mx;
  let by = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function render() {
    ax += (mx - ax) * 0.2;
    ay += (my - ay) * 0.2;
    bx += (mx - bx) * 0.1;
    by += (my - by) * 0.1;

    a.style.left = ax + "px";
    a.style.top = ay + "px";
    b.style.left = bx + Math.sin(Date.now() * 0.01) * 16 + "px";
    b.style.top = by + Math.cos(Date.now() * 0.012) * 16 + "px";

    requestAnimationFrame(render);
  }

  render();
})();
