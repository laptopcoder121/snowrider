export class Sled {
  constructor(ctx, imagePath) {
    this.ctx = ctx;
    this.x = 400;
    this.y = 500;
    this.width = 40;
    this.height = 40;
    this.image = new Image();
    this.image.src = imagePath;
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  handleKeydown(e) {
    if (e.key === 'ArrowLeft' && this.x > 0) this.x -= 20;
    if (e.key === 'ArrowRight' && this.x < this.ctx.canvas.width - this.width) this.x += 20;
  }
  update() { /* Additional sled logic */ }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
