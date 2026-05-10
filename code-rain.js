(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "code-rain";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "-1",
    pointerEvents: "none",
    opacity: "0.55",
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const CHARS =
    "01{}[]()<>=!+-*/&|;:.,func class var let const return if else import export async await void bool int float string true false null undefined () => {}";
  const charArr = CHARS.split("");
  const FONT_SIZE = 28;
  const COL_W = Math.round(FONT_SIZE * 2.2);
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / COL_W);
    drops = Array.from({ length: cols }, () => Math.random() * -80);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(8, 12, 26, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const char = charArr[Math.floor(Math.random() * charArr.length)];
      const x = i * COL_W;
      const y = drops[i] * FONT_SIZE;

      const headAlpha = 0.85 + Math.random() * 0.15;
      ctx.fillStyle = `rgba(0, 255, 70, ${headAlpha})`;
      ctx.shadowColor = "rgba(0, 255, 70, 0.9)";
      ctx.shadowBlur = 14;
      ctx.font = `bold ${FONT_SIZE}px 'SF Mono', 'Fira Code', monospace`;
      ctx.fillText(char, x, y);

      const trailChar = charArr[Math.floor(Math.random() * charArr.length)];
      ctx.fillStyle = "rgba(0, 180, 50, 0.45)";
      ctx.shadowBlur = 0;
      ctx.font = `${FONT_SIZE}px 'SF Mono', 'Fira Code', monospace`;
      ctx.fillText(trailChar, x, y - FONT_SIZE * 2);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.12 + Math.random() * 0.05;
    }
  }

  setInterval(draw, 90);
})();
