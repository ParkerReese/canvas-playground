export class Laser {

  constructor(private ctx: CanvasRenderingContext2D,
              private xCoord: number,
              private yCoord: number,
  ) {
    this.draw();
  }

  public move() {
    // Update position
    this.xCoord += 2;
    // Draw new laser
    this.draw();
  }

  private draw() {
    this.ctx.beginPath();

    this.ctx.moveTo(this.xCoord, this.yCoord);

    const linearGradient = this.ctx.createLinearGradient(this.xCoord, this.yCoord, this.xCoord + 100, this.yCoord);
    linearGradient.addColorStop(0, 'rgba(255,255,255,0)'); // transparent white
    linearGradient.addColorStop(1, 'rgba(255,0,0,1)'); // transparent white
    this.ctx.strokeStyle = linearGradient;

    this.ctx.lineWidth = 2;

    this.ctx.shadowBlur = 1;
    this.ctx.shadowColor = "orange";

    console.log('stroke');
    this.ctx.lineTo(this.xCoord + 100, this.yCoord);
    this.ctx.stroke();
  }
}
