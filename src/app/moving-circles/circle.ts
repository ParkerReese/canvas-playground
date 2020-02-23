export class Circle {

  constructor(private ctx: CanvasRenderingContext2D,
              private radius: number,
              private xCoord: number,
              private yCoord: number,
              private xSpeed: number,
              private ySpeed: number,
              private maxXCoord: number,
              private maxYCoord: number,
              private color: string
  ) {
    this.draw();
  }

  public move() {
    // Draw new circle
    this.xCoord = this.getNextXCoord();
    this.yCoord = this.getNextYCoord();
    this.draw();
  }

  private getNextXCoord(): number {
    if ((this.xCoord + this.radius) > this.maxXCoord || this.xCoord - this.radius < 0) {
      this.xSpeed = -this.xSpeed;
    }
    return this.xCoord += this.xSpeed
  }

  private getNextYCoord(): number {
    if ((this.yCoord + this.radius) > this.maxYCoord || (this.yCoord - this.radius) < 0) {
      this.ySpeed = -this.ySpeed;
    }
    return this.yCoord += this.ySpeed
  }

  private draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.xCoord, this.yCoord, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }
}
