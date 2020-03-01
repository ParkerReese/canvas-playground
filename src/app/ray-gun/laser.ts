export class Laser {

  constructor(private ctx: CanvasRenderingContext2D,
              private xCoord: number,
              private yCoord: number,
              private speed: number,
              private length: number,
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
    linearGradient.addColorStop(0, 'rgba(255,255,255,0)'); // transparent white
    linearGradient.addColorStop(1, 'rgba(255,0,0,1)'); // transparent white
    this.ctx.strokeStyle = linearGradient;

    this.ctx.lineWidth = 2;

    this.ctx.shadowBlur = 1;
    this.ctx.shadowColor = "orange";

    this.ctx.lineTo(this.xCoord + this.length, this.yCoord);
    this.ctx.stroke();
  }
}
