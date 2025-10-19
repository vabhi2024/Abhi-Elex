const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let W, H, fireworks = [];

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 4 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.alpha -= 0.015;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, W, H);

  if (Math.random() < 0.05) {
    fireworks.push(
      new Firework(
        Math.random() * W,
        Math.random() * H / 2,
        `hsl(${Math.random() * 360},100%,60%)`
      )
    );
  }

  fireworks.forEach(f => {
    f.update();
    f.draw();
  });
  fireworks = fireworks.filter(f => f.particles.length > 0);

  requestAnimationFrame(loop);
}
loop();