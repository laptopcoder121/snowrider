export class Obstacle {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = Math.random() * (canvas.width - 40);
    this.y = -40;
    this.width = 40;
    this.height = 40;
  }
  updateAndDraw(sled) {
    this.y += 4;
    if (this.y > this.canvas.height) return;
    if (this.checkCollision(sled)) gameRunning = false;
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  checkCollision(sled) {
    return (
      sled.x < this.x + this.width &&
      sled.x + sled.width > this.x &&
      sled.y < this.y + this.height &&
      sled.y + sled.height > this.y
    );
  }
}
