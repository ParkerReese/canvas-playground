export class Circle {

  constructor(private ctx: CanvasRenderingContext2D) {
  }

  draw(xCoord: number, yCoord: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.arc(xCoord, yCoord, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}
