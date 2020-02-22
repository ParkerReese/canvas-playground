export class Line {

  constructor(private ctx: CanvasRenderingContext2D,
  ) {
    this.draw();
  }

  private draw() {
    this.ctx.beginPath();
    // TODO
    this.ctx.stroke();
  }
}
