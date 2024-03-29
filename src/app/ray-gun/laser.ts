export class Laser {

  constructor(
    private ctx: CanvasRenderingContext2D,
    private xCoord: number,
    private yCoord: number,
    private speed: number,
    private length: number,
    private width: number,
    private color: string,
    private glowWidth: number,
    private glowColor: string,
    private tailColor: string
  ) {
    this.draw();
  }

  public get x() {
    return this.xCoord;
  }

  public move() {
    // Update position
    this.xCoord += this.speed;
    // Draw new laser
    this.draw();
  }

  private draw() {
    this.ctx.beginPath();

    this.ctx.moveTo(this.xCoord, this.yCoord);

    const linearGradient = this.ctx.createLinearGradient(this.xCoord, this.yCoord, this.xCoord + this.length, this.yCoord);
    linearGradient.addColorStop(0, this.tailColor);
    linearGradient.addColorStop(1, this.color);
    this.ctx.strokeStyle = linearGradient;

    this.ctx.lineWidth = this.width;

    this.ctx.shadowBlur = this.glowWidth;
    this.ctx.shadowColor = this.glowColor;

    this.ctx.lineTo(this.xCoord + this.length, this.yCoord);
    this.ctx.stroke();
  }
}
