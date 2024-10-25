export class Present {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = Math.random() * (canvas.width - 30);
    this.y = -30;
    this.width = 30;
    this.height = 30;
    this.image = new Image();
    this.image.src = 'assets/present.png';
  }
  updateAndCollect(sled, callback) {
    this.y += 3;
    if (this.y > this.canvas.height) return;
    if (this.checkCollision(sled)) {
      callback(10);
      presents.splice(presents.indexOf(this), 1);
    }
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
