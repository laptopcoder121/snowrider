export class Sled {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 400;
    this.y = 500;
    this.width = 40;
    this.height = 40;
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  handleKeydown(e) {
    if (e.key === 'ArrowLeft' && this.x > 0) this.x -= 20;
    if (e.key === 'ArrowRight' && this.x < this.ctx.canvas.width - this.width) this.x += 20;
  }
  update() {}
  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
