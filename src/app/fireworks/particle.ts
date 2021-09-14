import { Coordinate, random } from '../shared';

export class Particle {
  // Current actual position
  private curPosition: Coordinate;
  // Used to create a tail
  private pastPositions: Coordinate[] = [];
  private pastPositionsLength = 4;
  // Angle to move away from explosion location
  private angle: number = random(0, Math.PI * 2);
  // Movement
  private speed: number = random(1, 10);
  private gravity = 1;
  private friction = 0.95;
  // How quickly the particle fades
  private decay = random(0.015, 0.04);
  private alpha = 1.5;

  // Used for the owner of this object to know if it can be cleaned up
  private canDestroy = false;

  constructor(private ctx: CanvasRenderingContext2D,
              // Starting position
              private startPos: Coordinate
  ) {
    // Initialize positions
    for (let i = 0; i < this.pastPositionsLength; i++) {
      this.pastPositions.push({x: startPos.x, y: startPos.y});
    }
    this.curPosition = {x: startPos.x, y: startPos.y};
  }

  public update() {
    this.move();
    this.draw();

    if (this.alpha <= this.decay) {
      this.canDestroy = true;
    }
  }

  // Move particle to next position
  private move() {
    // remove last item in coordinates array
    this.pastPositions.pop();
    // add current coordinates to the beginning of the array
    this.pastPositions.unshift({x: this.curPosition.x, y: this.curPosition.y});
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.curPosition.x += Math.cos(this.angle) * this.speed;
    this.curPosition.y += Math.sin(this.angle) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;
  }

  // Draw particle given latest position
  private draw() {
    this.ctx.beginPath();
    // move to the last oldest position in the set, then draw a line to the current x and y
    const pastPos = this.pastPositions[this.pastPositionsLength - 1];
    this.ctx.moveTo(pastPos.x, pastPos.y);
    this.ctx.lineTo(this.curPosition.x, this.curPosition.y);
    this.ctx.strokeStyle = this.randColor();
    this.ctx.stroke();
  }

  // returns a random hsl color https://www.w3schools.com/colors/colors_hsl.asp
  private randColor(): string {
    return 'hsl(' + random(0, 360) + ', 100%, ' + random(50, 60) + '%' + this.alpha + ')';
  }

  public get canDelete() {
    return this.canDestroy;
  }
}
