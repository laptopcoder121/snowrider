export class Present {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = Math.random() * (canvas.width - 30);
    this.y = -30;
    this.radius = 15;
  }
  updateAndCollect(sled, callback) {
    this.y += 3;
    if (this.y > this.canvas.height) return;
    if (this.checkCollision(sled)) {
      callback(10);
      presents.splice(presents.indexOf(this), 1);
    }
    this.ctx.fillStyle = 'green';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  checkCollision(sled) {
    return (
      sled.x < this.x + this.radius &&
      sled.x + sled.width > this.x - this.radius &&
      sled.y < this.y + this.radius &&
      sled.y + sled.height > this.y - this.radius
    );
  }
}
