export class Circle {

  constructor(private ctx: CanvasRenderingContext2D,
              private radius: number,
              private xCoord: number,
              private yCoord: number,
              private xSpeed: number,
              private ySpeed: number,
              private maxXCoord: number,
              private maxYCoord: number
  ) {
    this.draw();
  }

  public move() {
    // Clear old circle
    this.clear();

    // Draw new circle
    this.xCoord = this.getNextXCoord();
    this.yCoord = this.getNextYCoord();
    this.draw();
  }

  private getNextXCoord(): number {
    if (this.xCoord + this.radius > this.maxXCoord || this.xCoord - this.radius < 0) {
      this.xSpeed = -this.xSpeed;
    }
    return this.xCoord += this.xSpeed
  }

  private getNextYCoord(): number {
    if (this.yCoord + this.radius > this.maxYCoord || this.yCoord - this.radius < 0) {
      this.ySpeed = -this.ySpeed;
    }
    return this.yCoord += this.ySpeed
  }

  private clear() {
    const diameter = this.radius * 2;
    const bottomLeftXCoord = this.xCoord - this.radius - 1;
    const bottomLeftYCoord = this.yCoord - this.radius - 1;
    this.ctx.clearRect(bottomLeftXCoord, bottomLeftYCoord, diameter + 2, diameter + 2);
  }

  private draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.xCoord, this.yCoord, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}
